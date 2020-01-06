import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

DESTINATION_PLACE_FIELD_ID = 'destinationPlace'
START_PLACE_FIELD_ID = 'startPlace'
FLIGHT_DATE_FIELD_ID = 'flightDate'
CARRIER_NAME_FIELD_XPATH= "//select[@id='carrierName']/option[text()='LOT']"
PLANE_NAME_FIELD_XPATH = "//select[@id='planeName']/option[text()='Plane model']"
FLIGHT_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'Azkaban']"
FLIGHT_EDITED_ROW_XPATH = "//div[contains(@class, 'data-grid-cell-mutable') and text() = 'Hogwart']"
ADD_NEW_BUTTON_ID = 'add-new-button'
PROGRESS_INDICATOR_ID = 'progress-indicator'
TRASH_BUTTON_XPATH = "(//li[contains(@class, 'data-grid-row')]//button[contains(@id, 'delete-button')])[last()]"
FLIGHT_EDIT_XPATH = "//input[contains(@name, '{}')]"
EDIT_BUTTON_ID = 'edit-button'
CANCEL_BUTTON_ID = 'cancel-button'
FLIGHTS_SUBPAGE_BUTTON_ID = 'flights'
ROW_COUNT_XPATH = "//li[contains(@class, 'data-grid-row-data')]"

class FlightsPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
        print "TEST Case: ", self._testMethodName

    def tearDown(self):
        self.driver.close()

    def test_should_add_new_flight(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_flights_subpage()
        self._add_new_flight()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, FLIGHT_XPATH)))

    def test_should_remove_flight(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_flights_subpage()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        count_before_remove = self._get_flights_rows_count()
        self.wait.until(EC.visibility_of_element_located((By.XPATH, TRASH_BUTTON_XPATH))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, ROW_COUNT_XPATH)))
        self.assertEquals(count_before_remove - 1, self._get_flights_rows_count())

    def test_should_cancel_edit_and_then_edit_flight(self):
        self._login_to_website_and_wait_to_load()
        self._click_on_flights_subpage()
        self._add_new_flight()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,FLIGHT_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.ID,CANCEL_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH,FLIGHT_XPATH))).click()
        self._edit_flight()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))
        self.wait.until(EC.visibility_of_element_located((By.XPATH, FLIGHT_EDITED_ROW_XPATH)))

    def _add_new_flight(self):
        destination_place_field = self.wait.until(EC.visibility_of_element_located((By.ID,DESTINATION_PLACE_FIELD_ID)))
        destination_place_field.send_keys("Azkaban")
        start_place_field = self.wait.until(EC.visibility_of_element_located((By.ID,START_PLACE_FIELD_ID)))
        start_place_field.send_keys("Paragwaj")
        flight_date_field = self.wait.until(EC.visibility_of_element_located((By.ID,FLIGHT_DATE_FIELD_ID)))
        flight_date_field.send_keys("2019-03-02")
        self.wait.until(EC.visibility_of_element_located((By.XPATH,CARRIER_NAME_FIELD_XPATH))).click()
        self.wait.until(EC.visibility_of_element_located((By.XPATH,PLANE_NAME_FIELD_XPATH))).click()

        self.wait.until(EC.visibility_of_element_located((By.ID,ADD_NEW_BUTTON_ID))).click()
        self.wait.until(EC.invisibility_of_element_located((By.ID, PROGRESS_INDICATOR_ID)))

    def _edit_flight(self):
        destination_place_field = self.wait.until(EC.visibility_of_element_located(
            (By.XPATH,FLIGHT_EDIT_XPATH.format(DESTINATION_PLACE_FIELD_ID))))
        destination_place_field.clear()
        destination_place_field.send_keys("Hogwart")
        
        self.wait.until(EC.visibility_of_element_located((By.ID,EDIT_BUTTON_ID))).click()

    def _click_on_flights_subpage(self):
        self.wait.until(EC.visibility_of_element_located((
            By.ID,FLIGHTS_SUBPAGE_BUTTON_ID))).click()

    def _get_flights_rows_count(self):
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