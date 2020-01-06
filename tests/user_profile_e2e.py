import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.support import expected_conditions as EC

FIRST_NAME_FIELD_ID = "first-name-input"
LAST_NAME_FIELD_ID = "last-name-input"
PASSWORD_FIELD_ID= "password-input"
SAVE_BUTTON_ID = 'save-button'
EDITED_FIELD_XPATH = "//span[contains(@class, 'info-list-element') and text() = '{}']"
PROFILE_LINK_ID = 'profile-link'
PROGRESS_INDICATOR_ID = 'progress-indicator'

class UserProfile(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_change_profile_data(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_user_profile_subpage()
        self._edit_profile()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, EDITED_FIELD_XPATH.format('First'))))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, EDITED_FIELD_XPATH.format('Last'))))

    def _click_on_user_profile_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,PROFILE_LINK_ID))).click()

    def _edit_profile(self):
        first_name_field = self.wait.until(EC.visibility_of_element_located(
            (By.ID,FIRST_NAME_FIELD_ID)))
        first_name_field.clear()
        first_name_field.send_keys("First")
        last_name_field = self.wait.until(EC.visibility_of_element_located(
            (By.ID,LAST_NAME_FIELD_ID)))
        last_name_field.clear()
        last_name_field.send_keys("Last")

        self.wait.until(EC.visibility_of_element_located(
            (By.ID,SAVE_BUTTON_ID))).click()

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