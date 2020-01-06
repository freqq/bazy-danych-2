import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

CARRIER_NAME_FIELD_ID = 'carrierName'
CARRIER_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'ZZZ Carrier name']"
CARRIER_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'ZZZ Changed carrier name']"
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
CARRIER_EDIT_XPATH = "//input[contains(@name, '{}')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'
CARRIERS_SUBPAGE_BUTTON_ID = 'carriers'
ROW_COUNT_XPATH = "//li[contains(@class, 'data-grid-row-data')]"

class CarriersPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_carrier(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_carriers_subpage()
        self._add_new_carrier()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, CARRIER_XPATH)))

    def test_should_remove_carrier(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_carriers_subpage()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        count_before_remove = self._get_carrier_rows_count()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        self.assertEquals(count_before_remove - 1, self._get_carrier_rows_count())

    def test_should_cancel_edit_and_then_edit_carrier(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_carriers_subpage()
        self._add_new_carrier()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,CARRIER_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,CARRIER_XPATH))).click()
        self._edit_ticket()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, CARRIER_EDITED_ROW_XPATH)))

    def _add_new_carrier(self):
        first_name_field = self.wait.until(EC.visibility_of_element_located((By.ID,CARRIER_NAME_FIELD_ID)))
        first_name_field.send_keys("ZZZ Carrier name")

        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_ticket(self):
        carrier_name_field = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH,CARRIER_EDIT_XPATH.format(CARRIER_NAME_FIELD_ID))))
        carrier_name_field.clear()
        carrier_name_field.send_keys("ZZZ Changed carrier name")
        
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_carriers_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,CARRIERS_SUBPAGE_BUTTON_ID))).click()

    def _get_carrier_rows_count(self):
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