# Manual Testing Documentation – SauceDemo E-Commerce

**Application Under Test (AUT):** https://saucedemo.com  
**Tester:** Alondra Valdez  
**Browser / OS:** Google Chrome / Windows

---

## 1. Test Cases Execution Summary

| Test ID | Module | Test Scenario | Preconditions | Test Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Login | Successful login with valid credentials | User is on login page | 1. Enter `standard_user`<br>2. Enter `secret_sauce`<br>3. Click **Login** | User is redirected to `/inventory.html` and product catalog loads. | **Pass** |
| **TC-02** | Login | Login attempt with locked-out user | User is on login page | 1. Enter `locked_out_user`<br>2. Enter `secret_sauce`<br>3. Click **Login** | Error banner displays: *"Epic sadface: Sorry, this user has been locked out."* | **Pass** |
| **TC-03** | Login | Login attempt with invalid password | User is on login page | 1. Enter `standard_user`<br>2. Enter `wrong_pass`<br>3. Click **Login** | Error banner displays: *"Username and password do not match any user in this service"* | **Pass** |
| **TC-04** | Inventory | Add single item to shopping cart | Logged in as `standard_user` | 1. Click **Add to cart** on *Sauce Labs Backpack* | Button changes to **Remove** and cart badge shows `1`. | **Pass** |
| **TC-05** | Inventory | Remove item from shopping cart on catalog page | 1 item added to cart | 1. Click **Remove** button on *Sauce Labs Backpack* | Button reverts to **Add to cart** and cart badge disappears. | **Fail** *(See BUG-02)* |
| **TC-06** | Inventory | Sort products by Price (low to high) | Logged in on `/inventory.html` | 1. Select **Price (low to high)** from sort dropdown | Products reorder ascending from `$7.99` to `$49.99`. | **Fail** *(See BUG-03)* |
| **TC-07** | Checkout | Complete end-to-end purchase flow | 1 item in cart (`standard_user`) | 1. Open Cart > **Checkout**<br>2. Enter First Name, Last Name, Zip<br>3. Click **Continue** > **Finish** | Order confirmation page displays *"Thank you for your order!"* | **Pass** |
| **TC-08** | Checkout | Validate Checkout form fields input | 1 item in cart (`problem_user`) | 1. Go to Checkout Step One<br>2. Type First Name and Last Name | Both input fields accept and retain typed characters. | **Fail** *(See BUG-04)* |

---

## 2. Defect Reports

### BUG-01: Product catalog displays broken/duplicate placeholder images
- **Severity:** Medium | **Priority:** High | **Status:** Open
- **Steps to Reproduce:**
  1. Navigate to `https://saucedemo.com`.
  2. Log in with username `problem_user` and password `secret_sauce`.
  3. Inspect product thumbnails on `/inventory.html`.
- **Expected Result:** Each product displays its corresponding unique product image.
- **Actual Result:** All 6 products display the exact same placeholder image (`sl-404.jpg`).

### BUG-02: "Remove" button fails to remove items on the Inventory page
- **Severity:** High | **Priority:** High | **Status:** Open
- **Steps to Reproduce:**
  1. Log in as `problem_user`.
  2. Click **Add to cart** on *Sauce Labs Backpack* (cart counter updates to `1`).
  3. Click the **Remove** button on the same product card.
- **Expected Result:** Item is removed from cart and counter resets to `0`.
- **Actual Result:** Clicking **Remove** triggers no action; item remains stuck in cart from the catalog view.

### BUG-03: Product sorting dropdown filter is non-functional
- **Severity:** Medium | **Priority:** Medium | **Status:** Open
- **Steps to Reproduce:**
  1. Log in as `problem_user`.
  2. Click the sorting dropdown in the top right corner and select **Price (low to high)**.
- **Expected Result:** Catalog items dynamically sort from lowest price (`$7.99`) to highest price (`$49.99`).
- **Actual Result:** Product order remains unchanged in default A-Z order.

### BUG-04: Last Name field overwrites First Name during Checkout
- **Severity:** Critical | **Priority:** High | **Status:** Open
- **Steps to Reproduce:**
  1. Log in as `problem_user`, add an item to cart, and navigate to **Checkout: Your Information**.
  2. Type `Alondra` in **First Name**.
  3. Click **Last Name** and type `Valdez`.
- **Expected Result:** First Name retains `Alondra` and Last Name displays `Valdez`.
- **Actual Result:** Typing in Last Name overwrites the First Name field, leaving Last Name blank and blocking checkout progression (`Error: Last Name is required`).
