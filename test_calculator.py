import pytest

from Calculator import add, div

def test_add_pass():
    result =  add(4,10)
    assert result == 14

def test_add_fail():
    result = add(6,1)
    assert result == 7