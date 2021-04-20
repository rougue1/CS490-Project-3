'''
unmocked testing for date conversion and getting user info
'''
# pylint: disable-all

from db_api import DBQuery, convert_to_datetime_obj
import unittest
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))

USER_NAME = 'user'
DATA_INPUT = 'data'
EXPECTED_OUTPUT = "expected"


class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params_get_date_time_obj = [{
            DATA_INPUT:
            '3/21/2021',
            EXPECTED_OUTPUT:
            datetime.date(2021, 3, 21)
        }, {
            DATA_INPUT:
            '12/1/2020',
            EXPECTED_OUTPUT:
            datetime.date(2020, 12, 1)
        }, {
            DATA_INPUT:
            '1/30/2019',
            EXPECTED_OUTPUT:
            datetime.date(2019, 1, 30)
        }]
        self.success_test_params_get_user_info = [{
            USER_NAME:
            'Aman Hirpara',
            DATA_INPUT: [{
                'transaction_type': 'Income',
                'amount': 20
            }],
            EXPECTED_OUTPUT: {
                'full_name': 'Aman Hirpara',
                'balance': 20,
                'income': 20,
                'expense': 0
            }
        }, {
            USER_NAME:
            'Aman Hirpara',
            DATA_INPUT: [{
                'transaction_type': 'Expense',
                'amount': 20
            }],
            EXPECTED_OUTPUT: {
                'full_name': 'Aman Hirpara',
                'balance': -20,
                'income': 0,
                'expense': 20
            }
        }, {
            USER_NAME:
            'Aman Hirpara',
            DATA_INPUT: [{
                'transaction_type': 'Income',
                'amount': 20
            }, {
                'transaction_type': 'Expense',
                'amount': 20
            }],
            EXPECTED_OUTPUT: {
                'full_name': 'Aman Hirpara',
                'balance': 0,
                'income': 20,
                'expense': 20
            }
        }, {
            USER_NAME:
            'Aman',
            DATA_INPUT: [{
                'transaction_type': 'Income',
                'amount': 40
            }, {
                'transaction_type': 'Expense',
                'amount': 20
            }],
            EXPECTED_OUTPUT: {
                'full_name': 'Aman',
                'balance': 20,
                'income': 40,
                'expense': 20
            }
        }, {
            USER_NAME:
            'Hirpara',
            DATA_INPUT: [{
                'transaction_type': 'Income',
                'amount': 20
            }, {
                'transaction_type': 'Expense',
                'amount': 40
            }],
            EXPECTED_OUTPUT: {
                'full_name': 'Hirpara',
                'balance': -20,
                'income': 20,
                'expense': 40
            }
        }]

    def test_convert_datetime_obj(self):
        """ This test checks the update board function on app functions file side """
        for test in self.success_test_params_get_date_time_obj:
            actual_result = convertToDatetimeObj(test['data'])

            expected_result = test["expected"]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))

    def test_get_user_info(self):
        """ This test checks the update board function on app functions file side """
        for test in self.success_test_params_get_user_info:
            actual_result = getUserInfo(test['user'], test['data'])

            expected_result = test["expected"]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))


if __name__ == '__main__':
    unittest.main()
