import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.support import expected_conditions as EC

CLIENT_FIELD_ID= "client"
FLIGHT_FIELD_ID = "flight"
TICKET_FIELD_ID= "ticket"
BAGGAGE_WEIGHT_FIELD_ID = 'baggageWeight'
FLIGHT_CLASS_FIELD_ID = 'flightClass'
ORDER_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'A']"
ORDER_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'B']"
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
ORDER_EDIT_XPATH = "//input[contains(@name, '{}')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'
ORDERS_SUBPAGE_BUTTON_ID = 'orders'
ROW_COUNT_XPATH = "//li[contains(@class, 'data-grid-row-data')]"
ROW_HEADER_XPATH = "//li[contains(@class, 'data-grid-row')]"
NO_DATA_XPATH = "//p[contains(@class, 'no-data')]"

class OrdersPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_order(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_orders_subpage()
        self._add_new_order()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ORDER_XPATH)))

    def test_should_remove_order(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_orders_subpage()
        self.wait.until(lambda driver: EC.presence_of_element_located((By.XPATH, ROW_COUNT_XPATH)) 
            or EC.presence_of_element_located((By.XPATH, NO_DATA_XPATH)))
        count_before_remove = self._get_orders_rows_count()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(lambda driver: EC.presence_of_element_located((By.XPATH, ROW_COUNT_XPATH)) 
            or EC.presence_of_element_located((By.XPATH, NO_DATA_XPATH)))
        self.assertEquals(count_before_remove - 1, self._get_orders_rows_count())

    def test_should_cancel_edit_and_then_edit_order(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_orders_subpage()
        self._add_new_order()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,ORDER_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,ORDER_XPATH))).click()
        self._edit_order()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ORDER_EDITED_ROW_XPATH)))

    def _add_new_order(self):
        select_client = Select(self.driver.find_element_by_id(CLIENT_FIELD_ID))
        select_client.select_by_index(1)
        select_flight = Select(self.driver.find_element_by_id(FLIGHT_FIELD_ID))
        select_flight.select_by_index(1)
        select_ticket = Select(self.driver.find_element_by_id(TICKET_FIELD_ID))
        select_ticket.select_by_index(1)
        baggage_weight_field = self.wait.until(EC.visibility_of_element_located((By.ID,BAGGAGE_WEIGHT_FIELD_ID)))
        baggage_weight_field.send_keys("123")
        flight_class_field = self.wait.until(EC.visibility_of_element_located((By.ID,FLIGHT_CLASS_FIELD_ID)))
        flight_class_field.send_keys("A")

        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_order(self):
        flight_class_field = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH,ORDER_EDIT_XPATH.format(FLIGHT_CLASS_FIELD_ID))))
        flight_class_field.clear()
        flight_class_field.send_keys("B")
        
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_orders_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,ORDERS_SUBPAGE_BUTTON_ID))).click()
        self.wait.until(EC.visibility_of_element_located((
            By.XPATH,ROW_HEADER_XPATH)))


    def _get_orders_rows_count(self):
        return len(self.driver.find_elements_by_xpath(ROW_COUNT_XPATH))

    def _login_to_website_and_wait_to_load(self):
        self.driver.get("http://localhost:3000")
        self.assertIn("LOT Airlines", self.driver.title)
        elem = self.driver.find_element_by_id("login-input")
        elem.send_keys("admin")
        elem = self.driver.find_element_by_id("password-input")
        elem.send_keys("admin2")
        elem.send_keys(Keys.RETURN)
        self.driver.find_element_by_class_name("login-button").click()
        self.wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".toolbar-header")))

if __name__ == "__main__":
    unittest.main()