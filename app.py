from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
from functools import wraps
from datetime import datetime

app = Flask(__name__)

# Secret key for session
app.secret_key = 'secure_key'

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'python_etr'

mysql = MySQL(app)

# Login required decorator


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session or not session.get('user'):
            flash("You need to log in first!", "warning")
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# Admin required decorator


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('role') != 'admin':
            flash('Access restricted to admin users.', 'danger')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

# Routes


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if not email or not password:
            flash('Email and Password are required!', 'danger')
            return render_template('login.html')

        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT id, first_name, role FROM users WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['user'] = user[1]
            session['role'] = user[2]
            return redirect(url_for('home'))
        else:
            flash('Invalid login credentials.', 'danger')

    return render_template('login.html')


@app.route('/home')
@login_required
def home():
    return render_template('home.html', user=session['user'], role=session['role'])


@app.route('/management', methods=['GET', 'POST'])
@login_required
def management():
    role = session.get('role')
    cur = mysql.connection.cursor()

    # Pagination logic
    page = request.args.get('page', 1, type=int)  # Default to page 1
    per_page = 6  # Number of customers per page
    offset = (page - 1) * per_page

    if role == 'regular':
        cur.execute("SELECT * FROM products LIMIT %s OFFSET %s",
                    (per_page, offset))
        items = cur.fetchall()

        # Count the total number of products for pagination
        cur.execute("SELECT COUNT(*) FROM products")
        total_items = cur.fetchone()[0]

        total_pages = (total_items + per_page - 1) // per_page
        cur.close()
        return render_template('product_management.html', products=items, page=page, total_pages=total_pages)

    elif role == 'admin':
        # Fetch paginated customers
        cur.execute("SELECT * FROM customers LIMIT %s OFFSET %s",
                    (per_page, offset))
        customers = cur.fetchall()

        # Count the total number of customers for pagination
        cur.execute("SELECT COUNT(*) FROM customers")
        total_customers = cur.fetchone()[0]

        total_pages = (total_customers + per_page - 1) // per_page
        cur.close()
        return render_template('customer_management.html', customers=customers, page=page, total_pages=total_pages)

    cur.close()


# Add, Update, Delete Products (Regular User)


@app.route('/add_product', methods=['POST'])
@login_required
def add_product():
    if session.get('role') != 'regular':
        return redirect(url_for('management'))

    name = request.form['name']
    description = request.form['description']
    price = request.form['price']
    stock = request.form['stock']
    category = request.form['category']
    status = request.form['status']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO products (name, description, price, stock, category, status) VALUES (%s, %s, %s, %s, %s, %s)",
                (name, description, price, stock, category, status))
    mysql.connection.commit()
    cur.close()
    flash('', 'success')
    return redirect(url_for('management'))


@app.route('/delete_product/<int:product_id>')
@login_required
def delete_product(product_id):
    if session.get('role') != 'regular':
        return redirect(url_for('management'))

    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
    mysql.connection.commit()
    cur.close()
    flash('', 'success')
    return redirect(url_for('management'))


@app.route('/update_product/<int:product_id>', methods=['POST'])
@login_required
def update_product(product_id):
    if session.get('role') != 'regular':
        return redirect(url_for('management'))

    # Fetch form data
    name = request.form['name']
    description = request.form['description']
    price = request.form['price']
    stock = request.form['stock']
    category = request.form['category']
    status = request.form['status']

    # Connect to the database
    cur = mysql.connection.cursor()

    # Update the product in the database
    cur.execute("""
        UPDATE products
        SET name = %s, description = %s, price = %s, stock = %s, category = %s, status = %s
        WHERE id = %s
    """, (name, description, price, stock, category, status, product_id))

    # Commit the changes
    mysql.connection.commit()
    cur.close()

    # Flash success message and redirect to the management page
    flash('', 'success')
    return redirect(url_for('management'))


# Add, Update, Delete Customers (Admin User)

@app.route('/add_customer', methods=['POST'])
@admin_required
def add_customer():
    full_name = request.form['full_name']
    email = request.form['email']
    phone = request.form['phone']
    address = request.form['address']
    status = request.form['status']
    registration_date = datetime.now()

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO customers (full_name, email, phone, address, status, registration_date) VALUES (%s, %s, %s, %s, %s, %s)",
                (full_name, email, phone, address, status, registration_date))
    mysql.connection.commit()
    cur.close()
    flash('Customer added successfully!', 'success')
    return redirect(url_for('management'))


@app.route('/delete_customer/<int:customer_id>')
@admin_required
def delete_customer(customer_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM customers WHERE id = %s", (customer_id,))
    mysql.connection.commit()
    cur.close()
    flash('', 'success')
    return redirect(url_for('management'))


@app.route('/edit_customer/<int:customer_id>', methods=['GET', 'POST'])
@admin_required
def edit_customer(customer_id):
    cur = mysql.connection.cursor()

    if request.method == 'POST':
        # Update customer details
        full_name = request.form['full_name']
        email = request.form['email']
        phone = request.form['phone']
        address = request.form['address']
        status = request.form['status']

        cur.execute("""
            UPDATE customers
            SET full_name = %s, email = %s, phone = %s, address = %s, status = %s
            WHERE id = %s
        """, (full_name, email, phone, address, status, customer_id))
        mysql.connection.commit()
        flash('Customer updated successfully!', 'success')
        return redirect(url_for('management'))

    else:
        # Retrieve customer details for the form
        cur.execute("SELECT * FROM customers WHERE id = %s", (customer_id,))
        customer = cur.fetchone()
        cur.close()
        if not customer:
            flash('Customer not found!', 'danger')
            return redirect(url_for('management'))
        return render_template('edit_customer.html', customer=customer)


@app.route('/about')
@login_required
def about():
    return render_template('about.html', user=session['user'])


@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(debug=True)
