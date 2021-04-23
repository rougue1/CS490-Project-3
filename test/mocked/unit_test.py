import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from db_api import DBQuery
import models

key_input = "input"
key_expected = "expected"

initial_user_id = "0000000001"


class UserTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params1 = [{
            key_input:
            ",
            key_expected: [
                models.Users(initial_user_id, "initial_user@goomail.com",
                             "TestUser", "TestUserLastName"),
                models.Users("0000000010", "second_test@chairmail.com", "TestUser2",
                             "TestUserLastName2")
            ]
        }, {
            key_input: 
        }
        ]
