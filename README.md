<h1>SmartHomes Web Application</h1>

<p><strong>SmartHomes</strong> is an online retailer web application built using React and Node.js, designed to allow customers to browse and order smart home products. The app offers a smooth and user-friendly experience, with features like product search with autocomplete, order management, and customer accounts.</p>

<h2>Features</h2>

<h3>Customer Experience</h3>
<ul>
  <li><strong>Product Categories</strong>: Customers can browse products in the following categories:
    <ul>
      <li>Smart Doorbells</li>
      <li>Smart Doorlocks</li>
      <li>Smart Speakers</li>
      <li>Smart Lightings</li>
      <li>Smart Thermostats</li>
    </ul>
  </li>
  <li><strong>Order Management</strong>:
    <ul>
      <li>Customers can create an account, add/remove items to/from their shopping cart, and place orders.</li>
      <li>Choose between <strong>Store Pickup</strong> or <strong>Home Delivery</strong> during checkout.</li>
      <li>Customers can view their order status and cancel orders (up to 5 business days before the scheduled delivery).</li>
    </ul>
  </li>
  <li><strong>Search Functionality</strong>: Autocomplete search helps customers quickly find the products they’re looking for.</li>
  <li><strong>Warranty Options</strong>: Available for all products at an additional cost.</li>
  <li><strong>Payment</strong>: Secure credit card payment for online orders.</li>
</ul>

<h3>Store Management</h3>
<ul>
  <li><strong>Store Manager</strong>:
    <ul>
      <li>Can add, delete, or update products in the store.</li>
    </ul>
  </li>
  <li><strong>Salesman</strong>:
    <ul>
      <li>Can create customer accounts and manage customer orders.</li>
    </ul>
  </li>
</ul>

<h3>Product Details</h3>
<ul>
  <li>Each product has a name, price, description, and related accessories.</li>
  <li>Accessories are displayed horizontally below the product details.</li>
  <li>Some products have special retailer discounts or manufacturer rebates.</li>
</ul>

<h3>Store Pickup</h3>
<ul>
  <li>Customers choosing <strong>Store Pickup</strong> can select from 10 hardcoded store locations across various zip codes.</li>
  <li>Customers receive a confirmation number and estimated pickup/delivery date.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Frontend</strong>: React.js</li>
  <li><strong>Backend</strong>: Node.js with Express.js</li>
  <li><strong>Database</strong>:
    <ul>
      <li><strong>MySQL</strong> for transaction management.</li>
      <li><strong>MongoDB</strong> for storing and managing product reviews.</li>
    </ul>
  </li>
</ul>

<h2>Project Structure</h2>
<p>The project is divided into two main directories:</p>
<ul>
  <li><strong>Frontend</strong>: Contains the React-based user interface.</li>
  <li><strong>Backend</strong>: Contains the Node.js API and database interactions.</li>
</ul>

<h2>Setup and Installation</h2>
<ol>
  <li>Clone the repository:
    <pre><code>[git clone https://github.com/RikGanguli/SmartHome-Marketplace.git]</code></pre>
  </li>
  <li>Navigate to the <strong>Frontend</strong> and <strong>Backend</strong> directories and install dependencies:
    <pre><code>
cd SmartHome-Marketplace/Frontend
npm install
cd ../Backend
npm install
    </code></pre>
  </li>
  <li>Configure the MySQL and MongoDB databases:
    <ul>
      <li>Set up MySQL for transaction data.</li>
      <li>Configure MongoDB for storing product reviews.</li>
    </ul>
  </li>
   <li>Start both the frontend and backend servers:
    <pre><code>
# In one terminal:
cd smarthomes/Frontend
npm start
# In another terminal:
cd smarthomes/Backend
npm start
    </code></pre>
  </li>
  <li>Access the application in your browser at <code>http://localhost:3000</code>.</li>
</ol>

