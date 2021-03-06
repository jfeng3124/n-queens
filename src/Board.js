// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      // Get rowIndex with hasAnyRowConflicts function
      var row = this.get(rowIndex);
      // Create variable counter at 0
      var counter = 0;
      // Iterate through rowIndex
      for (var i = 0; i < row.length; i++) {
        // If 1 exists add to counter variable
        if (row[i] === 1) {
          counter++;
        }
      }
      // Return if counter is greater than
      return counter > 1;
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // Get whole boardSize
      var boardSize = this.get('n');
      // Iterate through boardSize
      for (var i = 0; i < boardSize; i++) {
        // If hasRowConflictAt at the index of boardSize is true
        if (this.hasRowConflictAt(i)) {
          // Return true
          return true;
        }
      }
      // Else return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this boardSize contains a conflict
    hasColConflictAt: function (colIndex) {
      // Create a new variable to get boardSize matrix
      var boardSize = this.get('n');
      // Create variable counter
      var counter = 0;
      // Iterate through boardSize
      for (var i = 0; i < boardSize; i++) {
        // Create variable to store row at index
        var row = this.get(i);
        // Increase counter by row[colidx]
        counter += row[colIndex];
      }
      // If counter > 1
      return counter > 1;
    },

    // test if any columns on this boardSize contain conflicts
    hasAnyColConflicts: function () {
      // Create a new variable to get boardSize matrix
      var boardSize = this.get('n');
      // Iterate through the boardSize row
      for (var i = 0; i < boardSize; i++) {
        // If hasColConflictAt returns true from row
        if (this.hasColConflictAt(i)) {
          // Return true
          return true;
        }
      }
      // Else return false
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      //create a variable to get the whole board
      var board = this.attributes;
      //create a variable for board size
      var boardSize = this.get('n');
      //create the conflict counter
      var counter = 0;
      //iterate through the board size
      for (let i = 0; i < boardSize; i++) {
        //if the board at row i at column index equals 1
        if (board[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
          //add to conflict counter
          counter++;
        }
        //add to column index
        majorDiagonalColumnIndexAtFirstRow++;
      }
      //if conflict is greater than 1, return true
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      //create a variable for board size
      var boardSize = this.get('n')
      //iterate through board size at position -1
      for (let i = -1; i < boardSize; i++) {
        //if the has major diagonal conflict at board size
        if (this.hasMajorDiagonalConflictAt(i)) {
          //return true
          return true;
        }
      }
      //else return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      // Create variable for whole board
      var board = this.attributes;
      // Create variable for boardSize
      var boardSize = this.get('n');
      // Create variable for counter
      var counter = 0;
      // Iterate through the boardSize
      for (var i = 0; i < boardSize; i++) {
        // If whole board row at minor index is 1
        if (board[i][minorDiagonalColumnIndexAtFirstRow] === 1) {
          // Increase counter
          counter++;
        }
        // Decrease minor index
        minorDiagonalColumnIndexAtFirstRow--;
      }
      // If counter is great than 1 return true;
      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      // Create variable for boardSize
      var boardSize = this.get('n');
      // Iterate through boardSize starting at 0 ending at boardSize - 1
      for (var i = 0; i < boardSize + (boardSize - 1); i++) {
        // If minor diagonal has conflict at boardSize
        if (this.hasMinorDiagonalConflictAt(i)) {
          // Return true
          return true;
        }
      }
      // Else return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
