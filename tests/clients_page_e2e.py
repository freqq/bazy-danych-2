import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

FIRST_NAME_FIELD_ID = 'firstName'
LAST_NAME_FIELD_ID = 'lastName'
PESEL_FIELD_ID = 'pesel'
BIRTHDAY_FIELD_ID = 'birthday'
EMAIL_FIELD_ID = 'email'
DISCOUNT_FIELD_XPATH = "//input[contains(@name, 'Discount')]"
ID_NUMBER_FIELD_ID = 'iDNumber'
CLIENT_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'First name']"
CLIENT_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'Changed name']"
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
CLIENT_EDIT_XPATH = "//input[contains(@name, '{}')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'
CLIENTS_SUBPAGE_BUTTON_ID = 'clients'
ROW_COUNT_XPATH = "//li[contains(@class, 'data-grid-row-data')]"

class ClientsPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_client(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_clients_subpage()
        self._add_new_client()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, CLIENT_XPATH)))

    def test_should_remove_client(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_clients_subpage()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        count_before_remove = self._get_clients_rows_count()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        self.assertEquals(count_before_remove - 1, self._get_clients_rows_count())

    def test_should_cancel_edit_and_then_edit_client(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_clients_subpage()
        self._add_new_client()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,CLIENT_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,CLIENT_XPATH))).click()
        self._edit_plane()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, CLIENT_EDITED_ROW_XPATH)))

    def _add_new_client(self):
        first_name_field = self.wait.until(EC.visibility_of_element_located((By.ID,FIRST_NAME_FIELD_ID)))
        first_name_field.send_keys("First name")
        last_name_field = self.wait.until(EC.visibility_of_element_located((By.ID,LAST_NAME_FIELD_ID)))
        last_name_field.send_keys("Last name")
        pesel_field = self.wait.until(EC.visibility_of_element_located((By.ID,PESEL_FIELD_ID)))
        pesel_field.send_keys("98030210892")
        birthday_field = self.wait.until(EC.visibility_of_element_located((By.ID,BIRTHDAY_FIELD_ID)))
        birthday_field.send_keys("1998-02-03")
        email_field = self.wait.until(EC.visibility_of_element_located((By.ID,EMAIL_FIELD_ID)))
        email_field.send_keys("email@email.com")
        self.wait.until(EC.visibility_of_element_located((By.XPATH,DISCOUNT_FIELD_XPATH))).click()
        id_number_field = self.wait.until(EC.visibility_of_element_located((By.ID,ID_NUMBER_FIELD_ID)))
        id_number_field.send_keys("DVV12323")
        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_plane(self):
        firs_name_field = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH,CLIENT_EDIT_XPATH.format('firstName'))))
        firs_name_field.clear()
        firs_name_field.send_keys("Changed name")
        
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_clients_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,CLIENTS_SUBPAGE_BUTTON_ID))).click()

    def _get_clients_rows_count(self):
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