import unittest
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from db_api import *

DATA_INPUT = 'data'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params_update_board = [
            {
                DATA_INPUT: '3/21/2021',
                EXPECTED_OUTPUT: datetime.date(2021, 3, 21)
            },
            {
                DATA_INPUT: '12/1/2020',
                EXPECTED_OUTPUT: datetime.date(2020, 12, 1)
            },
            {
                DATA_INPUT: '1/30/2019',
                EXPECTED_OUTPUT: datetime.date(2019, 1, 30)
            }
            # TODO add another test case
        ]

    def test_convert_datetime_obj(self):
        """ This test checks the update board function on app functions file side """
        for test in self.success_test_params_update_board:
            actual_result = convertToDatetimeObj(test['data'])

            expected_result = test["expected"]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))

if __name__ == '__main__':
    unittest.main()