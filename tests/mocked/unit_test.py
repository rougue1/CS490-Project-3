'''
mocked testing for updating user transaction and deleting a user transaction
'''
# pylint: disable-all
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import *
from db_api import *


KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_DATA = "data"



# {'formDataObj': {'type': 'Income', 'amount': '151', 'date': '2020-08-19', 
# 'location': 'NJIT Bookstore', 'category': 'Education', 'description': 'Intro to Computer Science'}, 'id': 65}

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 65,
                KEY_DATA:  {65: {'type': 'Income', 'amount': '151', 
                            'date': '2020-08-19', 'location': 'NJIT Bookstore', 
                            'category': 'Education', 'description': 'Intro to Computer Science'}, 
                            'id': 65},
                KEY_EXPECTED: {'type': 'Income', 'amount': '151', 'date': '2020-08-19', 
                                'location': 'NJIT Bookstore', 'category': 'Education', 
                                'description': 'Intro to Computer Science'}
                
            },
            {
                KEY_INPUT: 11,
                KEY_DATA:  {11: {'type': 'Expense', 'amount': '1117', 
                            'date': '2020-10-25', 'location': 'Bank', 
                            'category': 'Mortgage', 'description': 'Payed Monthly'}, 
                            'id': 11},
                KEY_EXPECTED: {'type': 'Expense', 'amount': '1117', 
                                'date': '2020-10-25', 'location': 'Bank', 
                                'category': 'Mortgage', 'description': 'Payed Monthly'},
            },
            {
                KEY_INPUT: 12,
                KEY_DATA:  {12: {'type': 'Expense', 'amount': '599', 
                            'date': '2021-11-21', 'location': 'Apple Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}, 
                            'id': 12},
                KEY_EXPECTED: {'type': 'Expense', 'amount': '599', 'date': '2021-11-21', 
                                'location': 'Apple Store', 'category': 'Gift', 
                                'description': 'Bought gift for mom'}
                
            },

        ]
        
        self.initial_db_mock = {65:{'type': 'Income', 'amount': '115', 
                            'date': '2020-08-17', 'location': 'Montclair Bookstore', 
                            'category': 'Education', 'description': 'Intro to Computer Science'}, 
                            'id': 65,11:{'type': 'Expense', 'amount': '1125', 
                            'date': '2020-10-25', 'location': 'Bank', 
                            'category': 'Mortgage', 'description': 'Payed Mortgage'}, 
                            'id': 11, 12:{'type': 'Expense', 'amount': '499', 
                            'date': '2020-08-17', 'location': 'Galaxy Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}, 
                            'id': 12,}
        
    
        
    def mocked_edit_transaction(self, 
            transaction_id,
            base):
                
        # print("The trans" + str(transaction_id))
        # print(self.initial_db_mock)
        self.initial_db_mock[transaction_id] = {'type': base["type"], 
            'amount': base["amount"], 
            'date': base["date"], 
            'location': base["location"], 
            'category': base["category"], 
            'description': base["description"]}
        

    
    def test_success(self):
        print("UPDATING SCORES FOR USERS!")
        for test in self.success_test_params:
            with patch('app.final_edit_transaction',self.mocked_edit_transaction):
               
                actual_result = update_user_info(test[KEY_DATA],test[KEY_INPUT])
                
                if actual_result == True:
                    actual_result = self.initial_db_mock[test[KEY_INPUT]]
                    
                print(f"ACTUAL: {actual_result}")
                expected_result = test[KEY_EXPECTED]
                print(f"EXPECTED: {expected_result}")
                
                
                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result, expected_result)
                                
class DeleteUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "id_data_1",
                KEY_DATA: {"id_data_1":65},
                KEY_EXPECTED: {11:{'type': 'Expense', 'amount': '1125', 
                            'date': '2020-10-25', 'location': 'Bank', 
                            'category': 'Mortgage', 'description': 'Payed Mortgage'}, 
                             12:{'type': 'Expense', 'amount': '499', 
                            'date': '2020-08-17', 'location': 'Galaxy Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}}
                
            },
            {
                KEY_INPUT: "id_data_2",
                KEY_DATA: {"id_data_2":11},
                KEY_EXPECTED:  {12:{'type': 'Expense', 'amount': '499', 
                            'date': '2020-08-17', 'location': 'Galaxy Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}}
            },
            {
                KEY_INPUT: "id_data_3",
                KEY_DATA: {"id_data_3":12},
                KEY_EXPECTED:  {12: {'type': 'Expense', 'amount': '599', 
                            'date': '2021-11-21', 'location': 'Apple Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}}, 
                KEY_EXPECTED: {},
                
            },

        ]
        
        self.initial_db_mock = {65:{'type': 'Income', 'amount': '115', 
                            'date': '2020-08-17', 'location': 'Montclair Bookstore', 
                            'category': 'Education', 'description': 'Intro to Computer Science'}, 
                            11:{'type': 'Expense', 'amount': '1125', 
                            'date': '2020-10-25', 'location': 'Bank', 
                            'category': 'Mortgage', 'description': 'Payed Mortgage'}, 
                             12:{'type': 'Expense', 'amount': '499', 
                            'date': '2020-08-17', 'location': 'Galaxy Store', 
                            'category': 'Gift', 'description': 'Bought gift for mom'}}
        
    
        
    def mocked_delete_transaction(self, trans_id):
        print("Deleting " + str(trans_id))
        print(self.initial_db_mock)
        del self.initial_db_mock[trans_id]
        

    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.final_delete_transaction',self.mocked_delete_transaction):
               
                actual_result = delete_user_task(test[KEY_DATA],test[KEY_INPUT])
                
                if actual_result == True:
                    actual_result = self.initial_db_mock
                    
                print(f"ACTUAL: {actual_result}")
                expected_result = test[KEY_EXPECTED]
                print(f"EXPECTED: {expected_result}")
                
                
                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result, expected_result)
                                
                                
                                
    
                    
                    
                
                
if __name__ == '__main__':
    unittest.main()
