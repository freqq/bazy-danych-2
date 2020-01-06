import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

TICKET_PRICE_FIELD_ID = 'price'
SEAT_NUMBER_FIELD_ID = 'seatNumber'
TICKET_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = '12345']"
TICKET_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = '123456']"
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
TICKET_EDIT_XPATH = "//input[contains(@name, '{}')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'
TICKETS_SUBPAGE_BUTTON_ID = 'tickets'

class TicketsPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_ticket(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_tickets_subpage()
        self._add_new_ticket()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TICKET_XPATH)))

    def test_should_remove_ticket(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_tickets_subpage()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def test_should_cancel_edit_and_then_edit_ticket(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_tickets_subpage()
        self._add_new_ticket()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,TICKET_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,TICKET_XPATH))).click()
        self._edit_ticket()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TICKET_EDITED_ROW_XPATH)))

    def _add_new_ticket(self):
        first_name_field = self.wait.until(EC.visibility_of_element_located((By.ID,TICKET_PRICE_FIELD_ID)))
        first_name_field.send_keys("12345")
        last_name_field = self.wait.until(EC.visibility_of_element_located((By.ID,SEAT_NUMBER_FIELD_ID)))
        last_name_field.send_keys("A3")
        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_ticket(self):
        firs_name_field = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH,TICKET_EDIT_XPATH.format(TICKET_PRICE_FIELD_ID))))
        firs_name_field.clear()
        firs_name_field.send_keys("123456")
        
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_tickets_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,TICKETS_SUBPAGE_BUTTON_ID))).click()

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