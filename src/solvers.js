/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  // Create solution variable
  var solution = [];
  // Create a new board variable
  var board = new Board({ n: n });
  // Create rook counter set to n
  var rookCounter = n;
  // Iterate over the number of times set by the input
  for (var i = 0; i < n; i++) {
    // Iterate over the column index
    for (var j = 0; j < n; j++) {
      // Toggle the row and column index
      board.togglePiece(i, j);
      // Subtract 1 from counter
      rookCounter--;
      // If conflict
      if (board.hasAnyRooksConflicts()) {
        // Toggle row and column index
        board.togglePiece(i, j);
        // Add 1 to counter
        rookCounter++;
        // If counter reaches 0
      }
      if (rookCounter === 0) {
        console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
        // Return row of board
        solution = board.rows();
        return solution;
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
