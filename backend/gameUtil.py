import numpy as np

def check_rows(board):
  for row in board:
      if len(set(row)) == 1:
          return row[0]
  return False

def check_diagonals(board):
  if len(set([board[i][i] for i in range(len(board))])) == 1:
      return board[0][0]
  if len(set([board[i][len(board)-i-1] for i in range(len(board))])) == 1:
      return board[0][len(board)-1]
  return False

def check_win(board):
  #transposition to check rows, then columns
  for newBoard in [board, np.transpose(board)]:
      result = check_rows(newBoard)
      if result:
          return result
  return check_diagonals(board)


if __name__ == "__main__":
  test_1 = [
    ['X', 'O', ''],
    ['O', '', 'O'],
    ['O', 'X', 'O']
  ]

  print(check_win(test_1)) # False

  test_2 = [
    ['X', 'O', ''],
    ['O', 'O', 'O'],
    ['O', 'X', 'O']
  ]

  print(check_win(test_2)) # O

  test_3 = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'X', 'O']
  ]

  print(check_win(test_3)) # X