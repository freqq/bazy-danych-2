import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

PLANE_MODEL_FIELD_ID = 'planeModel'
PLANE_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'Plane model']"
PLANE_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'Changed plane model']"
SEATS_COUNT_FIELD_ID = 'seatsCount'
PLANES_SUBPAGE_BUTTON_ID = 'planes'
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
PLANE_MODEL_EDIT_XPATH = "//input[contains(@name, 'planeModel')]"
SEATS_COUNT_EDIT_XPATH = "//input[contains(@name, 'seatsCount')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'

class PlanesPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_plane(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_planes_subpage()
        self._add_new_plane()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,PLANE_XPATH)))

    def test_should_remove_plane(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_planes_subpage()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def test_should_cancel_edit_and_then_edit_plane(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_planes_subpage()
        self._add_new_plane()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,PLANE_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,PLANE_XPATH))).click()
        self._edit_plane()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, PLANE_EDITED_ROW_XPATH)))

    def _add_new_plane(self):
        name_field = self.wait.until(EC.visibility_of_element_located((By.ID,PLANE_MODEL_FIELD_ID)))
        name_field.send_keys("Plane model")
        seats_count = self.wait.until(EC.visibility_of_element_located((By.ID,SEATS_COUNT_FIELD_ID)))
        seats_count.send_keys("123")
        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_plane(self):
        name_field = self.wait.until(EC.visibility_of_element_located((By.XPATH,PLANE_MODEL_EDIT_XPATH)))
        name_field.clear()
        name_field.send_keys("Changed plane model")
        seats_count = self.wait.until(EC.visibility_of_element_located((By.XPATH,SEATS_COUNT_EDIT_XPATH)))
        seats_count.clear()
        seats_count.send_keys("932")
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_planes_subpage(self):
        self.wait.until(EC.visibility_of_element_located((By.ID,PLANES_SUBPAGE_BUTTON_ID))).click()

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