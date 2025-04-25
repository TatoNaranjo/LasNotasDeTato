'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

let nanoid = (size = 21) => {
  let id = '';
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    let byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }
  return id
};

var chess = {};

/*
 * Copyright (c) 2021, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

(function (exports) {
var Chess = function (fen) {
  var BLACK = 'b';
  var WHITE = 'w';

  var EMPTY = -1;

  var PAWN = 'p';
  var KNIGHT = 'n';
  var BISHOP = 'b';
  var ROOK = 'r';
  var QUEEN = 'q';
  var KING = 'k';

  var SYMBOLS = 'pnbrqkPNBRQK';

  var DEFAULT_POSITION =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  var TERMINATION_MARKERS = ['1-0', '0-1', '1/2-1/2', '*'];

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
  };

  // prettier-ignore
  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  // prettier-ignore
  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  var FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q',
  };

  var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_7 = 1;
  var RANK_8 = 0;

  // prettier-ignore
  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [
      { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
    ],
    b: [
      { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
    ],
  };

  var board = new Array(128);
  var kings = { w: EMPTY, b: EMPTY };
  var turn = WHITE;
  var castling = { w: 0, b: 0 };
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};
  var comments = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }

  function clear(keep_headers) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false;
    }

    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY };
    turn = WHITE;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers) header = {};
    comments = {};
    update_setup(generate_fen());
  }

  function prune_comments() {
    var reversed_history = [];
    var current_comments = {};
    var copy_comment = function (fen) {
      if (fen in comments) {
        current_comments[fen] = comments[fen];
      }
    };
    while (history.length > 0) {
      reversed_history.push(undo_move());
    }
    copy_comment(generate_fen());
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop());
      copy_comment(generate_fen());
    }
    comments = current_comments;
  }

  function reset() {
    load(DEFAULT_POSITION);
  }

  function load(fen, keep_headers) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false;
    }

    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;

    if (!validate_fen(fen).valid) {
      return false
    }

    clear(keep_headers);

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < 'a' ? WHITE : BLACK;
        put({ type: piece.toLowerCase(), color: color }, algebraic(square));
        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }

    ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);

    update_setup(generate_fen());

    return true
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen) {
    var errors = {
      0: 'No errors.',
      1: 'FEN string must contain six space-delimited fields.',
      2: '6th field (move number) must be a positive integer.',
      3: '5th field (half move counter) must be a non-negative integer.',
      4: '4th field (en-passant square) is invalid.',
      5: '3rd field (castling availability) is invalid.',
      6: '2nd field (side to move) is invalid.',
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: '1st field (piece positions) is invalid [consecutive numbers].',
      9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    };

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] }
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] }
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] }
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] }
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] }
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] }
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] }
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0;
      var previous_was_number = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] }
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] }
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] }
      }
    }

    if (
      (tokens[3][1] == '3' && tokens[1] == 'w') ||
      (tokens[3][1] == '6' && tokens[1] == 'b')
    ) {
      return { valid: false, error_number: 11, error: errors[11] }
    }

    /* everything's okay! */
    return { valid: true, error_number: 0, error: errors[0] }
  }

  function generate_fen() {
    var empty = 0;
    var fen = '';

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = '';
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += 'K';
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += 'Q';
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += 'k';
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += 'q';
    }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    var epflags = ep_square === EMPTY ? '-' : algebraic(ep_square);

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ')
  }

  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1];
      }
    }
    return header
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function update_setup(fen) {
    if (history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1';
      header['FEN'] = fen;
    } else {
      delete header['SetUp'];
      delete header['FEN'];
    }
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return piece ? { type: piece.type, color: piece.color } : null
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (
      piece.type == KING &&
      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
    ) {
      return false
    }

    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }

    update_setup(generate_fen());

    return true
  }

  function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }

    update_setup(generate_fen());

    return piece
  }

  function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type,
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
    return move
  }

  function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (
        board[from].type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
      ) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
        for (var i = 0, len = pieces.length; i < len; i++) {
          moves.push(build_move(board, from, to, flags, pieces[i]));
        }
      } else {
        moves.push(build_move(board, from, to, flags));
      }
    }

    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = { b: RANK_7, w: RANK_2 };

    var first_sq = SQUARES.a8;
    var last_sq = SQUARES.h1;
    var single_square = false;

    /* do we want legal moves? */
    var legal =
      typeof options !== 'undefined' && 'legal' in options
        ? options.legal
        : true;

    var piece_type =
      typeof options !== 'undefined' &&
      'piece' in options &&
      typeof options.piece === 'string'
        ? options.piece.toLowerCase()
        : true;

    /* are we generating moves for a single square? */
    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        first_sq = last_sq = SQUARES[options.square];
        single_square = true;
      } else {
        /* invalid square */
        return []
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue
      }

      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue
      }

      if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue

          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us) break
              add_move(board, moves, i, square, BITS.CAPTURE);
              break
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if (piece_type === true || piece_type === KING) {
      if (!single_square || last_sq === kings[us]) {
        /* king-side castling */
        if (castling[us] & BITS.KSIDE_CASTLE) {
          var castling_from = kings[us];
          var castling_to = castling_from + 2;

          if (
            board[castling_from + 1] == null &&
            board[castling_to] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from + 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
          }
        }

        /* queen-side castling */
        if (castling[us] & BITS.QSIDE_CASTLE) {
          var castling_from = kings[us];
          var castling_to = castling_from - 2;

          if (
            board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
          }
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves
    }

    /* filter out illegal moves */
    var legal_moves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }

    return legal_moves
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move, moves) {
    var output = '';

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O';
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O';
    } else {
      if (move.piece !== PAWN) {
        var disambiguator = get_disambiguator(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += 'x';
      }

      output += algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase();
      }
    }

    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += '#';
      } else {
        output += '+';
      }
    }
    undo_move();

    return output
  }
  // parses all of the decorators out of a SAN string
  function stripped_san(move) {
    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
  }

  function attacked(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue
      }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true
          } else {
            if (piece.color === BLACK) return true
          }
          continue
        }

        /* if the piece is a knight or a king */
        if (piece.type === 'n' || piece.type === 'k') return true

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break
          }
          j += offset;
        }

        if (!blocked) return true
      }
    }

    return false
  }

  function king_attacked(color) {
    return attacked(swap_color(color), kings[color])
  }

  function in_check() {
    return king_attacked(turn)
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0
  }

  function in_stalemate() {
    return !in_check() && generate_moves().length === 0
  }

  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 0x88) {
        i += 7;
        continue
      }

      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }

    /* k vs. k */
    if (num_pieces === 2) {
      return true
    } else if (
      /* k vs. kn .... or .... k vs. kb */
      num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true
    } else if (num_pieces === pieces[BISHOP] + 2) {
      /* kb vs. kb where any number of bishops are all on the same color */
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true
      }
    }

    return false
  }

  function in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undo_move();
      if (!move) break
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen().split(' ').slice(0, 4).join(' ');

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break
      }
      make_move(moves.pop());
    }

    return repetition
  }

  function push(move) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
    });
  }

  function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us };
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }

      /* turn off castling */
      castling[us] = '';
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag;
          break
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          castling[them] & ROOKS[them][i].flag
        ) {
          castling[them] ^= ROOKS[them][i].flag;
          break
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }

    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }

  function undo_move() {
    var old = history.pop();
    if (old == null) {
      return null
    }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;

    var us = turn;
    var them = swap_color(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece; // to undo any promotions
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = { type: PAWN, color: them };
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }

      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }

    return move
  }

  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move, moves) {
    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var same_rank = 0;
    var same_file = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from;
      var ambig_to = moves[i].to;
      var ambig_piece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++;

        if (rank(from) === rank(ambig_from)) {
          same_rank++;
        }

        if (file(from) === file(ambig_from)) {
          same_file++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from)
      } else if (same_file > 0) {
        /* if the moving piece rests on the same file, use the rank symbol as the
         * disambiguator
         */
        return algebraic(from).charAt(1)
      } else {
        /* else use the file symbol */
        return algebraic(from).charAt(0)
      }
    }

    return ''
  }

  function infer_piece_type(san) {
    var piece_type = san.charAt(0);
    if (piece_type >= 'a' && piece_type <= 'h') {
      var matches = san.match(/[a-h]\d.*[a-h]\d/);
      if (matches) {
        return undefined
      }
      return PAWN
    }
    piece_type = piece_type.toLowerCase();
    if (piece_type === 'o') {
      return KING
    }
    return piece_type
  }
  function ascii() {
    var s = '   +------------------------+\n';
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |';
      }

      /* empty piece */
      if (board[i] == null) {
        s += ' . ';
      } else {
        var piece = board[i].type;
        var color = board[i].color;
        var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s += ' ' + symbol + ' ';
      }

      if ((i + 1) & 0x88) {
        s += '|\n';
        i += 8;
      }
    }
    s += '   +------------------------+\n';
    s += '     a  b  c  d  e  f  g  h\n';

    return s
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function move_from_san(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?! becomes Nf3
    var clean_move = stripped_san(move);

    var overly_disambiguated = false;

    if (sloppy) {
      // The sloppy parser allows the user to parse non-standard chess
      // notations. This parser is opt-in (by specifying the
      // '{ sloppy: true }' setting) and is only run after the Standard
      // Algebraic Notation (SAN) parser has failed.
      //
      // When running the sloppy parser, we'll run a regex to grab the piece,
      // the to/from square, and an optional promotion piece. This regex will
      // parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7, f7f8q,
      // b1c3

      // NOTE: Some positions and moves may be ambiguous when using the sloppy
      // parser. For example, in this position: 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1,
      // the move b1c3 may be interpreted as Nc3 or B1c3 (a disambiguated
      // bishop move). In these cases, the sloppy parser will default to the
      // most most basic interpretation - b1c3 parses to Nc3.

      var matches = clean_move.match(
        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
      );
      if (matches) {
        var piece = matches[1];
        var from = matches[2];
        var to = matches[3];
        var promotion = matches[4];

        if (from.length == 1) {
          overly_disambiguated = true;
        }
      } else {
        // The [a-h]?[1-8]? portion of the regex below handles moves that may
        // be overly disambiguated (e.g. Nge7 is unnecessary and non-standard
        // when there is one legal knight move to e7). In this case, the value
        // of 'from' variable will be a rank or file, not a square.
        var matches = clean_move.match(
          /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/
        );

        if (matches) {
          var piece = matches[1];
          var from = matches[2];
          var to = matches[3];
          var promotion = matches[4];

          if (from.length == 1) {
            var overly_disambiguated = true;
          }
        }
      }
    }

    var piece_type = infer_piece_type(clean_move);
    var moves = generate_moves({
      legal: true,
      piece: piece ? piece : piece_type,
    });

    for (var i = 0, len = moves.length; i < len; i++) {
      // try the strict parser first, then the sloppy parser if requested
      // by the user
      if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
        return moves[i]
      } else {
        if (sloppy && matches) {
          // hand-compare move properties with the results from our sloppy
          // regex
          if (
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[from] == moves[i].from &&
            SQUARES[to] == moves[i].to &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)
          ) {
            return moves[i]
          } else if (overly_disambiguated) {
            // SPECIAL CASE: we parsed a move string that may have an unneeded
            // rank/file disambiguator (e.g. Nge7).  The 'from' variable will
            var square = algebraic(moves[i].from);
            if (
              (!piece || piece.toLowerCase() == moves[i].piece) &&
              SQUARES[to] == moves[i].to &&
              (from == square[0] || from == square[1]) &&
              (!promotion || promotion.toLowerCase() == moves[i].promotion)
            ) {
              return moves[i]
            }
          }
        }
      }
    }

    return null
  }

  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i) {
    return i >> 4
  }

  function file(i) {
    return i & 15
  }

  function algebraic(i) {
    var f = file(i),
      r = rank(i);
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
  }

  function swap_color(c) {
    return c === WHITE ? BLACK : WHITE
  }

  function is_digit(c) {
    return '0123456789'.indexOf(c) !== -1
  }

  /* pretty = external move object */
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move, generate_moves({ legal: true }));
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = '';

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move
  }

  function clone(obj) {
    var dupe = obj instanceof Array ? [] : {};

    for (var property in obj) {
      if (typeof property === 'object') {
        dupe[property] = clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({ legal: false });
    var nodes = 0;
    var color = turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }

    return nodes
  }

  return {
    /***************************************************************************
     * PUBLIC CONSTANTS (is there a better way to do this?)
     **************************************************************************/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function () {
      /* from the ECMA-262 spec (section 12.6.4):
       * "The mechanics of enumerating the properties ... is
       * implementation dependent"
       * so: for (var sq in SQUARES) { keys.push(sq); } might not be
       * ordered correctly
       */
      var keys = [];
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (i & 0x88) {
          i += 7;
          continue
        }
        keys.push(algebraic(i));
      }
      return keys
    })(),
    FLAGS: FLAGS,

    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function (fen) {
      return load(fen)
    },

    reset: function () {
      return reset()
    },

    moves: function (options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves(options);
      var moves = [];

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(
            move_to_san(ugly_moves[i], generate_moves({ legal: true }))
          );
        }
      }

      return moves
    },

    in_check: function () {
      return in_check()
    },

    in_checkmate: function () {
      return in_checkmate()
    },

    in_stalemate: function () {
      return in_stalemate()
    },

    in_draw: function () {
      return (
        half_moves >= 100 ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    insufficient_material: function () {
      return insufficient_material()
    },

    in_threefold_repetition: function () {
      return in_threefold_repetition()
    },

    game_over: function () {
      return (
        half_moves >= 100 ||
        in_checkmate() ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    validate_fen: function (fen) {
      return validate_fen(fen)
    },

    fen: function () {
      return generate_fen()
    },

    board: function () {
      var output = [],
        row = [];

      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({ type: board[i].type, color: board[i].color });
        }
        if ((i + 1) & 0x88) {
          output.push(row);
          row = [];
          i += 8;
        }
      }

      return output
    },

    pgn: function (options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
       */
      var newline =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\n';
      var max_width =
        typeof options === 'object' && typeof options.max_width === 'number'
          ? options.max_width
          : 0;
      var result = [];
      var header_exists = false;

      /* add the PGN header headerrmation */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push('[' + i + ' "' + header[i] + '"]' + newline);
        header_exists = true;
      }

      if (header_exists && history.length) {
        result.push(newline);
      }

      var append_comment = function (move_string) {
        var comment = comments[generate_fen()];
        if (typeof comment !== 'undefined') {
          var delimiter = move_string.length > 0 ? ' ' : '';
          move_string = `${move_string}${delimiter}{${comment}}`;
        }
        return move_string
      };

      /* pop all of history onto reversed_history */
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      var moves = [];
      var move_string = '';

      /* special case of a commented starting position with no moves */
      if (reversed_history.length === 0) {
        moves.push(append_comment(''));
      }

      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string);
        var move = reversed_history.pop();

        /* if the position started with black to move, start PGN with 1. ... */
        if (!history.length && move.color === 'b') {
          move_string = move_number + '. ...';
        } else if (move.color === 'w') {
          /* store the previous generated move_string if we have one */
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + '.';
        }

        move_string =
          move_string + ' ' + move_to_san(move, generate_moves({ legal: true }));
        make_move(move);
      }

      /* are there any other leftover moves? */
      if (move_string.length) {
        moves.push(append_comment(move_string));
      }

      /* is there a result? */
      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result);
      }

      /* history should be back to what it was before we started generating PGN,
       * so join together moves
       */
      if (max_width === 0) {
        return result.join('') + moves.join(' ')
      }

      var strip = function () {
        if (result.length > 0 && result[result.length - 1] === ' ') {
          result.pop();
          return true
        }
        return false
      };

      /* NB: this does not preserve comment whitespace. */
      var wrap_comment = function (width, move) {
        for (var token of move.split(' ')) {
          if (!token) {
            continue
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--;
            }
            result.push(newline);
            width = 0;
          }
          result.push(token);
          width += token.length;
          result.push(' ');
          width++;
        }
        if (strip()) {
          width--;
        }
        return width
      };

      /* wrap the PGN output at max_width */
      var current_width = 0;
      for (var i = 0; i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes('{')) {
            current_width = wrap_comment(current_width, moves[i]);
            continue
          }
        }
        /* if the current move will push past max_width */
        if (current_width + moves[i].length > max_width && i !== 0) {
          /* don't end the line with whitespace */
          if (result[result.length - 1] === ' ') {
            result.pop();
          }

          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(' ');
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }

      return result.join('')
    },

    load_pgn: function (pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false;

      function mask(str) {
        return str.replace(/\\/g, '\\')
      }

      function parse_pgn_header(header, options) {
        var newline_char =
          typeof options === 'object' &&
          typeof options.newline_char === 'string'
            ? options.newline_char
            : '\r?\n';
        var header_obj = {};
        var headers = header.split(new RegExp(mask(newline_char)));
        var key = '';
        var value = '';

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\ *\]$/, '$1');
          if (trim(key).length > 0) {
            header_obj[key] = value;
          }
        }

        return header_obj
      }

      var newline_char =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\r?\n';

      // RegExp to split header. Takes advantage of the fact that header and movetext
      // will always have a blank line between them (ie, two newline_char's).
      // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
      var header_regex = new RegExp(
        '^(\\[((?:' +
          mask(newline_char) +
          ')|.)*\\])' +
          '(?:' +
          mask(newline_char) +
          '){2}'
      );

      // If no header given, begin with moves.
      var header_string = header_regex.test(pgn)
        ? header_regex.exec(pgn)[1]
        : '';

      // Put the board in the starting position
      reset();

      /* parse PGN header */
      var headers = parse_pgn_header(header_string, options);
      for (var key in headers) {
        set_header([key, headers[key]]);
      }

      /* load the starting position indicated by [Setup '1'] and
       * [FEN position] */
      if (headers['SetUp'] === '1') {
        if (!('FEN' in headers && load(headers['FEN'], true))) {
          // second argument to load: don't clear the headers
          return false
        }
      }

      /* NB: the regexes below that delete move numbers, recursive
       * annotations, and numeric annotation glyphs may also match
       * text in comments. To prevent this, we transform comments
       * by hex-encoding them in place and decoding them again after
       * the other tokens have been deleted.
       *
       * While the spec states that PGN files should be ASCII encoded,
       * we use {en,de}codeURIComponent here to support arbitrary UTF8
       * as a convenience for modern users */

      var to_hex = function (string) {
        return Array.from(string)
          .map(function (c) {
            /* encodeURI doesn't transform most ASCII characters,
             * so we handle these ourselves */
            return c.charCodeAt(0) < 128
              ? c.charCodeAt(0).toString(16)
              : encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
          })
          .join('')
      };

      var from_hex = function (string) {
        return string.length == 0
          ? ''
          : decodeURIComponent('%' + string.match(/.{1,2}/g).join('%'))
      };

      var encode_comment = function (string) {
        string = string.replace(new RegExp(mask(newline_char), 'g'), ' ');
        return `{${to_hex(string.slice(1, string.length - 1))}}`
      };

      var decode_comment = function (string) {
        if (string.startsWith('{') && string.endsWith('}')) {
          return from_hex(string.slice(1, string.length - 1))
        }
      };

      /* delete header to get the moves */
      var ms = pgn
        .replace(header_string, '')
        .replace(
          /* encode comments so they don't get deleted below */
          new RegExp(`(\{[^}]*\})+?|;([^${mask(newline_char)}]*)`, 'g'),
          function (match, bracket, semicolon) {
            return bracket !== undefined
              ? encode_comment(bracket)
              : ' ' + encode_comment(`{${semicolon.slice(1)}}`)
          }
        )
        .replace(new RegExp(mask(newline_char), 'g'), ' ');

      /* delete recursive annotation variations */
      var rav_regex = /(\([^\(\)]+\))+?/g;
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, '');
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, '');

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, '');

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, '');

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));

      /* delete empty entries */
      moves = moves.join(',').replace(/,,+/g, ',').split(',');
      var move = '';

      var result = '';

      for (var half_move = 0; half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move]);
        if (comment !== undefined) {
          comments[generate_fen()] = comment;
          continue
        }

        move = move_from_san(moves[half_move], sloppy);

        /* invalid move */
        if (move == null) {
          /* was the move an end of game marker */
          if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
            result = moves[half_move];
          } else {
            return false
          }
        } else {
          /* reset the end of game marker if making a valid move */
          result = '';
          make_move(move);
        }
      }

      /* Per section 8.2.6 of the PGN spec, the Result tag pair must match
       * match the termination marker. Only do this when headers are present,
       * but the result tag is missing
       */
      if (result && Object.keys(header).length && !header['Result']) {
        set_header(['Result', result]);
      }

      return true
    },

    header: function () {
      return set_header(arguments)
    },

    ascii: function () {
      return ascii()
    },

    turn: function () {
      return turn
    },

    move: function (move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false;

      var move_obj = null;

      if (typeof move === 'string') {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === 'object') {
        var moves = generate_moves();

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (
            move.from === algebraic(moves[i].from) &&
            move.to === algebraic(moves[i].to) &&
            (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)
          ) {
            move_obj = moves[i];
            break
          }
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var pretty_move = make_pretty(move_obj);

      make_move(move_obj);

      return pretty_move
    },

    undo: function () {
      var move = undo_move();
      return move ? make_pretty(move) : null
    },

    clear: function () {
      return clear()
    },

    put: function (piece, square) {
      return put(piece, square)
    },

    get: function (square) {
      return get(square)
    },

    remove: function (square) {
      return remove(square)
    },

    perft: function (depth) {
      return perft(depth)
    },

    square_color: function (square) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square];
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark'
      }

      return null
    },

    history: function (options) {
      var reversed_history = [];
      var move_history = [];
      var verbose =
        typeof options !== 'undefined' &&
        'verbose' in options &&
        options.verbose;

      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move, generate_moves({ legal: true })));
        }
        make_move(move);
      }

      return move_history
    },

    get_comment: function () {
      return comments[generate_fen()]
    },

    set_comment: function (comment) {
      comments[generate_fen()] = comment.replace('{', '[').replace('}', ']');
    },

    delete_comment: function () {
      var comment = comments[generate_fen()];
      delete comments[generate_fen()];
      return comment
    },

    get_comments: function () {
      prune_comments();
      return Object.keys(comments).map(function (fen) {
        return { fen: fen, comment: comments[fen] }
      })
    },

    delete_comments: function () {
      prune_comments();
      return Object.keys(comments).map(function (fen) {
        var comment = comments[fen];
        delete comments[fen];
        return { fen: fen, comment: comment }
      })
    },
  }
};

/* export Chess object if using node or any other CommonJS compatible
 * environment */
exports.Chess = Chess;
}(chess));

const colors = ['white', 'black'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

const invRanks = [...ranks].reverse();
const allKeys = Array.prototype.concat(...files.map(c => ranks.map(r => c + r)));
const pos2key = (pos) => allKeys[8 * pos[0] + pos[1]];
const key2pos = (k) => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];
const allPos = allKeys.map(key2pos);
function memo(f) {
    let v;
    const ret = () => {
        if (v === undefined)
            v = f();
        return v;
    };
    ret.clear = () => {
        v = undefined;
    };
    return ret;
}
const timer = () => {
    let startAt;
    return {
        start() {
            startAt = performance.now();
        },
        cancel() {
            startAt = undefined;
        },
        stop() {
            if (!startAt)
                return 0;
            const time = performance.now() - startAt;
            startAt = undefined;
            return time;
        },
    };
};
const opposite = (c) => (c === 'white' ? 'black' : 'white');
const distanceSq = (pos1, pos2) => {
    const dx = pos1[0] - pos2[0], dy = pos1[1] - pos2[1];
    return dx * dx + dy * dy;
};
const samePiece = (p1, p2) => p1.role === p2.role && p1.color === p2.color;
const posToTranslate = (bounds) => (pos, asWhite) => [((asWhite ? pos[0] : 7 - pos[0]) * bounds.width) / 8, ((asWhite ? 7 - pos[1] : pos[1]) * bounds.height) / 8];
const translate = (el, pos) => {
    el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
};
const translateAndScale = (el, pos, scale = 1) => {
    el.style.transform = `translate(${pos[0]}px,${pos[1]}px) scale(${scale})`;
};
const setVisible = (el, v) => {
    el.style.visibility = v ? 'visible' : 'hidden';
};
const eventPosition = (e) => {
    var _a;
    if (e.clientX || e.clientX === 0)
        return [e.clientX, e.clientY];
    if ((_a = e.targetTouches) === null || _a === void 0 ? void 0 : _a[0])
        return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    return; // touchend has no position!
};
const isRightButton = (e) => e.buttons === 2 || e.button === 2;
const createEl = (tagName, className) => {
    const el = document.createElement(tagName);
    if (className)
        el.className = className;
    return el;
};
function computeSquareCenter(key, asWhite, bounds) {
    const pos = key2pos(key);
    if (!asWhite) {
        pos[0] = 7 - pos[0];
        pos[1] = 7 - pos[1];
    }
    return [
        bounds.left + (bounds.width * pos[0]) / 8 + bounds.width / 16,
        bounds.top + (bounds.height * (7 - pos[1])) / 8 + bounds.height / 16,
    ];
}

function diff(a, b) {
    return Math.abs(a - b);
}
function pawn(color) {
    return (x1, y1, x2, y2) => diff(x1, x2) < 2 &&
        (color === 'white'
            ? // allow 2 squares from first two ranks, for horde
                y2 === y1 + 1 || (y1 <= 1 && y2 === y1 + 2 && x1 === x2)
            : y2 === y1 - 1 || (y1 >= 6 && y2 === y1 - 2 && x1 === x2));
}
const knight = (x1, y1, x2, y2) => {
    const xd = diff(x1, x2);
    const yd = diff(y1, y2);
    return (xd === 1 && yd === 2) || (xd === 2 && yd === 1);
};
const bishop = (x1, y1, x2, y2) => {
    return diff(x1, x2) === diff(y1, y2);
};
const rook = (x1, y1, x2, y2) => {
    return x1 === x2 || y1 === y2;
};
const queen = (x1, y1, x2, y2) => {
    return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2);
};
function king(color, rookFiles, canCastle) {
    return (x1, y1, x2, y2) => (diff(x1, x2) < 2 && diff(y1, y2) < 2) ||
        (canCastle &&
            y1 === y2 &&
            y1 === (color === 'white' ? 0 : 7) &&
            ((x1 === 4 && ((x2 === 2 && rookFiles.includes(0)) || (x2 === 6 && rookFiles.includes(7)))) ||
                rookFiles.includes(x2)));
}
function rookFilesOf(pieces, color) {
    const backrank = color === 'white' ? '1' : '8';
    const files = [];
    for (const [key, piece] of pieces) {
        if (key[1] === backrank && piece.color === color && piece.role === 'rook') {
            files.push(key2pos(key)[0]);
        }
    }
    return files;
}
function premove(pieces, key, canCastle) {
    const piece = pieces.get(key);
    if (!piece)
        return [];
    const pos = key2pos(key), r = piece.role, mobility = r === 'pawn'
        ? pawn(piece.color)
        : r === 'knight'
            ? knight
            : r === 'bishop'
                ? bishop
                : r === 'rook'
                    ? rook
                    : r === 'queen'
                        ? queen
                        : king(piece.color, rookFilesOf(pieces, piece.color), canCastle);
    return allPos
        .filter(pos2 => (pos[0] !== pos2[0] || pos[1] !== pos2[1]) && mobility(pos[0], pos[1], pos2[0], pos2[1]))
        .map(pos2key);
}

function callUserFunction(f, ...args) {
    if (f)
        setTimeout(() => f(...args), 1);
}
function toggleOrientation(state) {
    state.orientation = opposite(state.orientation);
    state.animation.current = state.draggable.current = state.selected = undefined;
}
function setPieces(state, pieces) {
    for (const [key, piece] of pieces) {
        if (piece)
            state.pieces.set(key, piece);
        else
            state.pieces.delete(key);
    }
}
function setCheck(state, color) {
    state.check = undefined;
    if (color === true)
        color = state.turnColor;
    if (color)
        for (const [k, p] of state.pieces) {
            if (p.role === 'king' && p.color === color) {
                state.check = k;
            }
        }
}
function setPremove(state, orig, dest, meta) {
    unsetPredrop(state);
    state.premovable.current = [orig, dest];
    callUserFunction(state.premovable.events.set, orig, dest, meta);
}
function unsetPremove(state) {
    if (state.premovable.current) {
        state.premovable.current = undefined;
        callUserFunction(state.premovable.events.unset);
    }
}
function setPredrop(state, role, key) {
    unsetPremove(state);
    state.predroppable.current = { role, key };
    callUserFunction(state.predroppable.events.set, role, key);
}
function unsetPredrop(state) {
    const pd = state.predroppable;
    if (pd.current) {
        pd.current = undefined;
        callUserFunction(pd.events.unset);
    }
}
function tryAutoCastle(state, orig, dest) {
    if (!state.autoCastle)
        return false;
    const king = state.pieces.get(orig);
    if (!king || king.role !== 'king')
        return false;
    const origPos = key2pos(orig);
    const destPos = key2pos(dest);
    if ((origPos[1] !== 0 && origPos[1] !== 7) || origPos[1] !== destPos[1])
        return false;
    if (origPos[0] === 4 && !state.pieces.has(dest)) {
        if (destPos[0] === 6)
            dest = pos2key([7, destPos[1]]);
        else if (destPos[0] === 2)
            dest = pos2key([0, destPos[1]]);
    }
    const rook = state.pieces.get(dest);
    if (!rook || rook.color !== king.color || rook.role !== 'rook')
        return false;
    state.pieces.delete(orig);
    state.pieces.delete(dest);
    if (origPos[0] < destPos[0]) {
        state.pieces.set(pos2key([6, destPos[1]]), king);
        state.pieces.set(pos2key([5, destPos[1]]), rook);
    }
    else {
        state.pieces.set(pos2key([2, destPos[1]]), king);
        state.pieces.set(pos2key([3, destPos[1]]), rook);
    }
    return true;
}
function baseMove(state, orig, dest) {
    const origPiece = state.pieces.get(orig), destPiece = state.pieces.get(dest);
    if (orig === dest || !origPiece)
        return false;
    const captured = destPiece && destPiece.color !== origPiece.color ? destPiece : undefined;
    if (dest === state.selected)
        unselect(state);
    callUserFunction(state.events.move, orig, dest, captured);
    if (!tryAutoCastle(state, orig, dest)) {
        state.pieces.set(dest, origPiece);
        state.pieces.delete(orig);
    }
    state.lastMove = [orig, dest];
    state.check = undefined;
    callUserFunction(state.events.change);
    return captured || true;
}
function baseNewPiece(state, piece, key, force) {
    if (state.pieces.has(key)) {
        if (force)
            state.pieces.delete(key);
        else
            return false;
    }
    callUserFunction(state.events.dropNewPiece, piece, key);
    state.pieces.set(key, piece);
    state.lastMove = [key];
    state.check = undefined;
    callUserFunction(state.events.change);
    state.movable.dests = undefined;
    state.turnColor = opposite(state.turnColor);
    return true;
}
function baseUserMove(state, orig, dest) {
    const result = baseMove(state, orig, dest);
    if (result) {
        state.movable.dests = undefined;
        state.turnColor = opposite(state.turnColor);
        state.animation.current = undefined;
    }
    return result;
}
function userMove(state, orig, dest) {
    if (canMove(state, orig, dest)) {
        const result = baseUserMove(state, orig, dest);
        if (result) {
            const holdTime = state.hold.stop();
            unselect(state);
            const metadata = {
                premove: false,
                ctrlKey: state.stats.ctrlKey,
                holdTime,
            };
            if (result !== true)
                metadata.captured = result;
            callUserFunction(state.movable.events.after, orig, dest, metadata);
            return true;
        }
    }
    else if (canPremove(state, orig, dest)) {
        setPremove(state, orig, dest, {
            ctrlKey: state.stats.ctrlKey,
        });
        unselect(state);
        return true;
    }
    unselect(state);
    return false;
}
function dropNewPiece(state, orig, dest, force) {
    const piece = state.pieces.get(orig);
    if (piece && (canDrop(state, orig, dest) || force)) {
        state.pieces.delete(orig);
        baseNewPiece(state, piece, dest, force);
        callUserFunction(state.movable.events.afterNewPiece, piece.role, dest, {
            premove: false,
            predrop: false,
        });
    }
    else if (piece && canPredrop(state, orig, dest)) {
        setPredrop(state, piece.role, dest);
    }
    else {
        unsetPremove(state);
        unsetPredrop(state);
    }
    state.pieces.delete(orig);
    unselect(state);
}
function selectSquare(state, key, force) {
    callUserFunction(state.events.select, key);
    if (state.selected) {
        if (state.selected === key && !state.draggable.enabled) {
            unselect(state);
            state.hold.cancel();
            return;
        }
        else if ((state.selectable.enabled || force) && state.selected !== key) {
            if (userMove(state, state.selected, key)) {
                state.stats.dragged = false;
                return;
            }
        }
    }
    if (isMovable(state, key) || isPremovable(state, key)) {
        setSelected(state, key);
        state.hold.start();
    }
}
function setSelected(state, key) {
    state.selected = key;
    if (isPremovable(state, key)) {
        state.premovable.dests = premove(state.pieces, key, state.premovable.castle);
    }
    else
        state.premovable.dests = undefined;
}
function unselect(state) {
    state.selected = undefined;
    state.premovable.dests = undefined;
    state.hold.cancel();
}
function isMovable(state, orig) {
    const piece = state.pieces.get(orig);
    return (!!piece &&
        (state.movable.color === 'both' || (state.movable.color === piece.color && state.turnColor === piece.color)));
}
function canMove(state, orig, dest) {
    var _a, _b;
    return (orig !== dest && isMovable(state, orig) && (state.movable.free || !!((_b = (_a = state.movable.dests) === null || _a === void 0 ? void 0 : _a.get(orig)) === null || _b === void 0 ? void 0 : _b.includes(dest))));
}
function canDrop(state, orig, dest) {
    const piece = state.pieces.get(orig);
    return (!!piece &&
        (orig === dest || !state.pieces.has(dest)) &&
        (state.movable.color === 'both' || (state.movable.color === piece.color && state.turnColor === piece.color)));
}
function isPremovable(state, orig) {
    const piece = state.pieces.get(orig);
    return !!piece && state.premovable.enabled && state.movable.color === piece.color && state.turnColor !== piece.color;
}
function canPremove(state, orig, dest) {
    return (orig !== dest && isPremovable(state, orig) && premove(state.pieces, orig, state.premovable.castle).includes(dest));
}
function canPredrop(state, orig, dest) {
    const piece = state.pieces.get(orig);
    const destPiece = state.pieces.get(dest);
    return (!!piece &&
        (!destPiece || destPiece.color !== state.movable.color) &&
        state.predroppable.enabled &&
        (piece.role !== 'pawn' || (dest[1] !== '1' && dest[1] !== '8')) &&
        state.movable.color === piece.color &&
        state.turnColor !== piece.color);
}
function isDraggable(state, orig) {
    const piece = state.pieces.get(orig);
    return (!!piece &&
        state.draggable.enabled &&
        (state.movable.color === 'both' ||
            (state.movable.color === piece.color && (state.turnColor === piece.color || state.premovable.enabled))));
}
function playPremove(state) {
    const move = state.premovable.current;
    if (!move)
        return false;
    const orig = move[0], dest = move[1];
    let success = false;
    if (canMove(state, orig, dest)) {
        const result = baseUserMove(state, orig, dest);
        if (result) {
            const metadata = { premove: true };
            if (result !== true)
                metadata.captured = result;
            callUserFunction(state.movable.events.after, orig, dest, metadata);
            success = true;
        }
    }
    unsetPremove(state);
    return success;
}
function playPredrop(state, validate) {
    const drop = state.predroppable.current;
    let success = false;
    if (!drop)
        return false;
    if (validate(drop)) {
        const piece = {
            role: drop.role,
            color: state.movable.color,
        };
        if (baseNewPiece(state, piece, drop.key)) {
            callUserFunction(state.movable.events.afterNewPiece, drop.role, drop.key, {
                premove: false,
                predrop: true,
            });
            success = true;
        }
    }
    unsetPredrop(state);
    return success;
}
function cancelMove(state) {
    unsetPremove(state);
    unsetPredrop(state);
    unselect(state);
}
function stop(state) {
    state.movable.color = state.movable.dests = state.animation.current = undefined;
    cancelMove(state);
}
function getKeyAtDomPos(pos, asWhite, bounds) {
    let file = Math.floor((8 * (pos[0] - bounds.left)) / bounds.width);
    if (!asWhite)
        file = 7 - file;
    let rank = 7 - Math.floor((8 * (pos[1] - bounds.top)) / bounds.height);
    if (!asWhite)
        rank = 7 - rank;
    return file >= 0 && file < 8 && rank >= 0 && rank < 8 ? pos2key([file, rank]) : undefined;
}
function getSnappedKeyAtDomPos(orig, pos, asWhite, bounds) {
    const origPos = key2pos(orig);
    const validSnapPos = allPos.filter(pos2 => {
        return queen(origPos[0], origPos[1], pos2[0], pos2[1]) || knight(origPos[0], origPos[1], pos2[0], pos2[1]);
    });
    const validSnapCenters = validSnapPos.map(pos2 => computeSquareCenter(pos2key(pos2), asWhite, bounds));
    const validSnapDistances = validSnapCenters.map(pos2 => distanceSq(pos, pos2));
    const [, closestSnapIndex] = validSnapDistances.reduce((a, b, index) => (a[0] < b ? a : [b, index]), [validSnapDistances[0], 0]);
    return pos2key(validSnapPos[closestSnapIndex]);
}
function whitePov(s) {
    return s.orientation === 'white';
}

const initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const roles = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
};
const letters = {
    pawn: 'p',
    rook: 'r',
    knight: 'n',
    bishop: 'b',
    queen: 'q',
    king: 'k',
};
function read(fen) {
    if (fen === 'start')
        fen = initial;
    const pieces = new Map();
    let row = 7, col = 0;
    for (const c of fen) {
        switch (c) {
            case ' ':
            case '[':
                return pieces;
            case '/':
                --row;
                if (row < 0)
                    return pieces;
                col = 0;
                break;
            case '~': {
                const piece = pieces.get(pos2key([col - 1, row]));
                if (piece)
                    piece.promoted = true;
                break;
            }
            default: {
                const nb = c.charCodeAt(0);
                if (nb < 57)
                    col += nb - 48;
                else {
                    const role = c.toLowerCase();
                    pieces.set(pos2key([col, row]), {
                        role: roles[role],
                        color: c === role ? 'black' : 'white',
                    });
                    ++col;
                }
            }
        }
    }
    return pieces;
}
function write(pieces) {
    return invRanks
        .map(y => files
        .map(x => {
        const piece = pieces.get((x + y));
        if (piece) {
            let p = letters[piece.role];
            if (piece.color === 'white')
                p = p.toUpperCase();
            if (piece.promoted)
                p += '~';
            return p;
        }
        else
            return '1';
    })
        .join(''))
        .join('/')
        .replace(/1{2,}/g, s => s.length.toString());
}

function applyAnimation(state, config) {
    if (config.animation) {
        deepMerge(state.animation, config.animation);
        // no need for such short animations
        if ((state.animation.duration || 0) < 70)
            state.animation.enabled = false;
    }
}
function configure(state, config) {
    var _a, _b;
    // don't merge destinations and autoShapes. Just override.
    if ((_a = config.movable) === null || _a === void 0 ? void 0 : _a.dests)
        state.movable.dests = undefined;
    if ((_b = config.drawable) === null || _b === void 0 ? void 0 : _b.autoShapes)
        state.drawable.autoShapes = [];
    deepMerge(state, config);
    // if a fen was provided, replace the pieces
    if (config.fen) {
        state.pieces = read(config.fen);
        state.drawable.shapes = [];
    }
    // apply config values that could be undefined yet meaningful
    if ('check' in config)
        setCheck(state, config.check || false);
    if ('lastMove' in config && !config.lastMove)
        state.lastMove = undefined;
    // in case of ZH drop last move, there's a single square.
    // if the previous last move had two squares,
    // the merge algorithm will incorrectly keep the second square.
    else if (config.lastMove)
        state.lastMove = config.lastMove;
    // fix move/premove dests
    if (state.selected)
        setSelected(state, state.selected);
    applyAnimation(state, config);
    if (!state.movable.rookCastle && state.movable.dests) {
        const rank = state.movable.color === 'white' ? '1' : '8', kingStartPos = ('e' + rank), dests = state.movable.dests.get(kingStartPos), king = state.pieces.get(kingStartPos);
        if (!dests || !king || king.role !== 'king')
            return;
        state.movable.dests.set(kingStartPos, dests.filter(d => !(d === 'a' + rank && dests.includes(('c' + rank))) &&
            !(d === 'h' + rank && dests.includes(('g' + rank)))));
    }
}
function deepMerge(base, extend) {
    for (const key in extend) {
        if (isObject(base[key]) && isObject(extend[key]))
            deepMerge(base[key], extend[key]);
        else
            base[key] = extend[key];
    }
}
function isObject(o) {
    return typeof o === 'object';
}

function anim(mutation, state) {
    return state.animation.enabled ? animate(mutation, state) : render$2(mutation, state);
}
function render$2(mutation, state) {
    const result = mutation(state);
    state.dom.redraw();
    return result;
}
function makePiece(key, piece) {
    return {
        key: key,
        pos: key2pos(key),
        piece: piece,
    };
}
function closer(piece, pieces) {
    return pieces.sort((p1, p2) => {
        return distanceSq(piece.pos, p1.pos) - distanceSq(piece.pos, p2.pos);
    })[0];
}
function computePlan(prevPieces, current) {
    const anims = new Map(), animedOrigs = [], fadings = new Map(), missings = [], news = [], prePieces = new Map();
    let curP, preP, vector;
    for (const [k, p] of prevPieces) {
        prePieces.set(k, makePiece(k, p));
    }
    for (const key of allKeys) {
        curP = current.pieces.get(key);
        preP = prePieces.get(key);
        if (curP) {
            if (preP) {
                if (!samePiece(curP, preP.piece)) {
                    missings.push(preP);
                    news.push(makePiece(key, curP));
                }
            }
            else
                news.push(makePiece(key, curP));
        }
        else if (preP)
            missings.push(preP);
    }
    for (const newP of news) {
        preP = closer(newP, missings.filter(p => samePiece(newP.piece, p.piece)));
        if (preP) {
            vector = [preP.pos[0] - newP.pos[0], preP.pos[1] - newP.pos[1]];
            anims.set(newP.key, vector.concat(vector));
            animedOrigs.push(preP.key);
        }
    }
    for (const p of missings) {
        if (!animedOrigs.includes(p.key))
            fadings.set(p.key, p.piece);
    }
    return {
        anims: anims,
        fadings: fadings,
    };
}
function step(state, now) {
    const cur = state.animation.current;
    if (cur === undefined) {
        // animation was canceled :(
        if (!state.dom.destroyed)
            state.dom.redrawNow();
        return;
    }
    const rest = 1 - (now - cur.start) * cur.frequency;
    if (rest <= 0) {
        state.animation.current = undefined;
        state.dom.redrawNow();
    }
    else {
        const ease = easing(rest);
        for (const cfg of cur.plan.anims.values()) {
            cfg[2] = cfg[0] * ease;
            cfg[3] = cfg[1] * ease;
        }
        state.dom.redrawNow(true); // optimisation: don't render SVG changes during animations
        requestAnimationFrame((now = performance.now()) => step(state, now));
    }
}
function animate(mutation, state) {
    // clone state before mutating it
    const prevPieces = new Map(state.pieces);
    const result = mutation(state);
    const plan = computePlan(prevPieces, state);
    if (plan.anims.size || plan.fadings.size) {
        const alreadyRunning = state.animation.current && state.animation.current.start;
        state.animation.current = {
            start: performance.now(),
            frequency: 1 / state.animation.duration,
            plan: plan,
        };
        if (!alreadyRunning)
            step(state, performance.now());
    }
    else {
        // don't animate, just render right away
        state.dom.redraw();
    }
    return result;
}
// https://gist.github.com/gre/1650294
function easing(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

const brushes = ['green', 'red', 'blue', 'yellow'];
function start$2(state, e) {
    // support one finger touch only
    if (e.touches && e.touches.length > 1)
        return;
    e.stopPropagation();
    e.preventDefault();
    e.ctrlKey ? unselect(state) : cancelMove(state);
    const pos = eventPosition(e), orig = getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
    if (!orig)
        return;
    state.drawable.current = {
        orig,
        pos,
        brush: eventBrush(e),
        snapToValidMove: state.drawable.defaultSnapToValidMove,
    };
    processDraw(state);
}
function processDraw(state) {
    requestAnimationFrame(() => {
        const cur = state.drawable.current;
        if (cur) {
            const keyAtDomPos = getKeyAtDomPos(cur.pos, whitePov(state), state.dom.bounds());
            if (!keyAtDomPos) {
                cur.snapToValidMove = false;
            }
            const mouseSq = cur.snapToValidMove
                ? getSnappedKeyAtDomPos(cur.orig, cur.pos, whitePov(state), state.dom.bounds())
                : keyAtDomPos;
            if (mouseSq !== cur.mouseSq) {
                cur.mouseSq = mouseSq;
                cur.dest = mouseSq !== cur.orig ? mouseSq : undefined;
                state.dom.redrawNow();
            }
            processDraw(state);
        }
    });
}
function move$1(state, e) {
    if (state.drawable.current)
        state.drawable.current.pos = eventPosition(e);
}
function end$1(state) {
    const cur = state.drawable.current;
    if (cur) {
        if (cur.mouseSq)
            addShape(state.drawable, cur);
        cancel$1(state);
    }
}
function cancel$1(state) {
    if (state.drawable.current) {
        state.drawable.current = undefined;
        state.dom.redraw();
    }
}
function clear(state) {
    if (state.drawable.shapes.length) {
        state.drawable.shapes = [];
        state.dom.redraw();
        onChange(state.drawable);
    }
}
function eventBrush(e) {
    var _a;
    const modA = (e.shiftKey || e.ctrlKey) && isRightButton(e);
    const modB = e.altKey || e.metaKey || ((_a = e.getModifierState) === null || _a === void 0 ? void 0 : _a.call(e, 'AltGraph'));
    return brushes[(modA ? 1 : 0) + (modB ? 2 : 0)];
}
function addShape(drawable, cur) {
    const sameShape = (s) => s.orig === cur.orig && s.dest === cur.dest;
    const similar = drawable.shapes.find(sameShape);
    if (similar)
        drawable.shapes = drawable.shapes.filter(s => !sameShape(s));
    if (!similar || similar.brush !== cur.brush)
        drawable.shapes.push(cur);
    onChange(drawable);
}
function onChange(drawable) {
    if (drawable.onChange)
        drawable.onChange(drawable.shapes);
}

function start$1(s, e) {
    if (!e.isTrusted || (e.button !== undefined && e.button !== 0))
        return; // only touch or left click
    if (e.touches && e.touches.length > 1)
        return; // support one finger touch only
    const bounds = s.dom.bounds(), position = eventPosition(e), orig = getKeyAtDomPos(position, whitePov(s), bounds);
    if (!orig)
        return;
    const piece = s.pieces.get(orig);
    const previouslySelected = s.selected;
    if (!previouslySelected && s.drawable.enabled && (s.drawable.eraseOnClick || !piece || piece.color !== s.turnColor))
        clear(s);
    // Prevent touch scroll and create no corresponding mouse event, if there
    // is an intent to interact with the board.
    if (e.cancelable !== false &&
        (!e.touches || s.blockTouchScroll || piece || previouslySelected || pieceCloseTo(s, position)))
        e.preventDefault();
    const hadPremove = !!s.premovable.current;
    const hadPredrop = !!s.predroppable.current;
    s.stats.ctrlKey = e.ctrlKey;
    if (s.selected && canMove(s, s.selected, orig)) {
        anim(state => selectSquare(state, orig), s);
    }
    else {
        selectSquare(s, orig);
    }
    const stillSelected = s.selected === orig;
    const element = pieceElementByKey(s, orig);
    if (piece && element && stillSelected && isDraggable(s, orig)) {
        s.draggable.current = {
            orig,
            piece,
            origPos: position,
            pos: position,
            started: s.draggable.autoDistance && s.stats.dragged,
            element,
            previouslySelected,
            originTarget: e.target,
            keyHasChanged: false,
        };
        element.cgDragging = true;
        element.classList.add('dragging');
        // place ghost
        const ghost = s.dom.elements.ghost;
        if (ghost) {
            ghost.className = `ghost ${piece.color} ${piece.role}`;
            translate(ghost, posToTranslate(bounds)(key2pos(orig), whitePov(s)));
            setVisible(ghost, true);
        }
        processDrag(s);
    }
    else {
        if (hadPremove)
            unsetPremove(s);
        if (hadPredrop)
            unsetPredrop(s);
    }
    s.dom.redraw();
}
function pieceCloseTo(s, pos) {
    const asWhite = whitePov(s), bounds = s.dom.bounds(), radiusSq = Math.pow(bounds.width / 8, 2);
    for (const key of s.pieces.keys()) {
        const center = computeSquareCenter(key, asWhite, bounds);
        if (distanceSq(center, pos) <= radiusSq)
            return true;
    }
    return false;
}
function dragNewPiece(s, piece, e, force) {
    const key = 'a0';
    s.pieces.set(key, piece);
    s.dom.redraw();
    const position = eventPosition(e);
    s.draggable.current = {
        orig: key,
        piece,
        origPos: position,
        pos: position,
        started: true,
        element: () => pieceElementByKey(s, key),
        originTarget: e.target,
        newPiece: true,
        force: !!force,
        keyHasChanged: false,
    };
    processDrag(s);
}
function processDrag(s) {
    requestAnimationFrame(() => {
        var _a;
        const cur = s.draggable.current;
        if (!cur)
            return;
        // cancel animations while dragging
        if ((_a = s.animation.current) === null || _a === void 0 ? void 0 : _a.plan.anims.has(cur.orig))
            s.animation.current = undefined;
        // if moving piece is gone, cancel
        const origPiece = s.pieces.get(cur.orig);
        if (!origPiece || !samePiece(origPiece, cur.piece))
            cancel(s);
        else {
            if (!cur.started && distanceSq(cur.pos, cur.origPos) >= Math.pow(s.draggable.distance, 2))
                cur.started = true;
            if (cur.started) {
                // support lazy elements
                if (typeof cur.element === 'function') {
                    const found = cur.element();
                    if (!found)
                        return;
                    found.cgDragging = true;
                    found.classList.add('dragging');
                    cur.element = found;
                }
                const bounds = s.dom.bounds();
                translate(cur.element, [
                    cur.pos[0] - bounds.left - bounds.width / 16,
                    cur.pos[1] - bounds.top - bounds.height / 16,
                ]);
                cur.keyHasChanged || (cur.keyHasChanged = cur.orig !== getKeyAtDomPos(cur.pos, whitePov(s), bounds));
            }
        }
        processDrag(s);
    });
}
function move(s, e) {
    // support one finger touch only
    if (s.draggable.current && (!e.touches || e.touches.length < 2)) {
        s.draggable.current.pos = eventPosition(e);
    }
}
function end(s, e) {
    const cur = s.draggable.current;
    if (!cur)
        return;
    // create no corresponding mouse event
    if (e.type === 'touchend' && e.cancelable !== false)
        e.preventDefault();
    // comparing with the origin target is an easy way to test that the end event
    // has the same touch origin
    if (e.type === 'touchend' && cur.originTarget !== e.target && !cur.newPiece) {
        s.draggable.current = undefined;
        return;
    }
    unsetPremove(s);
    unsetPredrop(s);
    // touchend has no position; so use the last touchmove position instead
    const eventPos = eventPosition(e) || cur.pos;
    const dest = getKeyAtDomPos(eventPos, whitePov(s), s.dom.bounds());
    if (dest && cur.started && cur.orig !== dest) {
        if (cur.newPiece)
            dropNewPiece(s, cur.orig, dest, cur.force);
        else {
            s.stats.ctrlKey = e.ctrlKey;
            if (userMove(s, cur.orig, dest))
                s.stats.dragged = true;
        }
    }
    else if (cur.newPiece) {
        s.pieces.delete(cur.orig);
    }
    else if (s.draggable.deleteOnDropOff && !dest) {
        s.pieces.delete(cur.orig);
        callUserFunction(s.events.change);
    }
    if ((cur.orig === cur.previouslySelected || cur.keyHasChanged) && (cur.orig === dest || !dest))
        unselect(s);
    else if (!s.selectable.enabled)
        unselect(s);
    removeDragElements(s);
    s.draggable.current = undefined;
    s.dom.redraw();
}
function cancel(s) {
    const cur = s.draggable.current;
    if (cur) {
        if (cur.newPiece)
            s.pieces.delete(cur.orig);
        s.draggable.current = undefined;
        unselect(s);
        removeDragElements(s);
        s.dom.redraw();
    }
}
function removeDragElements(s) {
    const e = s.dom.elements;
    if (e.ghost)
        setVisible(e.ghost, false);
}
function pieceElementByKey(s, key) {
    let el = s.dom.elements.board.firstChild;
    while (el) {
        if (el.cgKey === key && el.tagName === 'PIECE')
            return el;
        el = el.nextSibling;
    }
    return;
}

function explosion(state, keys) {
    state.exploding = { stage: 1, keys };
    state.dom.redraw();
    setTimeout(() => {
        setStage(state, 2);
        setTimeout(() => setStage(state, undefined), 120);
    }, 120);
}
function setStage(state, stage) {
    if (state.exploding) {
        if (stage)
            state.exploding.stage = stage;
        else
            state.exploding = undefined;
        state.dom.redraw();
    }
}

// see API types and documentations in dts/api.d.ts
function start(state, redrawAll) {
    function toggleOrientation$1() {
        toggleOrientation(state);
        redrawAll();
    }
    return {
        set(config) {
            if (config.orientation && config.orientation !== state.orientation)
                toggleOrientation$1();
            applyAnimation(state, config);
            (config.fen ? anim : render$2)(state => configure(state, config), state);
        },
        state,
        getFen: () => write(state.pieces),
        toggleOrientation: toggleOrientation$1,
        setPieces(pieces) {
            anim(state => setPieces(state, pieces), state);
        },
        selectSquare(key, force) {
            if (key)
                anim(state => selectSquare(state, key, force), state);
            else if (state.selected) {
                unselect(state);
                state.dom.redraw();
            }
        },
        move(orig, dest) {
            anim(state => baseMove(state, orig, dest), state);
        },
        newPiece(piece, key) {
            anim(state => baseNewPiece(state, piece, key), state);
        },
        playPremove() {
            if (state.premovable.current) {
                if (anim(playPremove, state))
                    return true;
                // if the premove couldn't be played, redraw to clear it up
                state.dom.redraw();
            }
            return false;
        },
        playPredrop(validate) {
            if (state.predroppable.current) {
                const result = playPredrop(state, validate);
                state.dom.redraw();
                return result;
            }
            return false;
        },
        cancelPremove() {
            render$2(unsetPremove, state);
        },
        cancelPredrop() {
            render$2(unsetPredrop, state);
        },
        cancelMove() {
            render$2(state => {
                cancelMove(state);
                cancel(state);
            }, state);
        },
        stop() {
            render$2(state => {
                stop(state);
                cancel(state);
            }, state);
        },
        explode(keys) {
            explosion(state, keys);
        },
        setAutoShapes(shapes) {
            render$2(state => (state.drawable.autoShapes = shapes), state);
        },
        setShapes(shapes) {
            render$2(state => (state.drawable.shapes = shapes), state);
        },
        getKeyAtDomPos(pos) {
            return getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
        },
        redrawAll,
        dragNewPiece(piece, event, force) {
            dragNewPiece(state, piece, event, force);
        },
        destroy() {
            stop(state);
            state.dom.unbind && state.dom.unbind();
            state.dom.destroyed = true;
        },
    };
}

function defaults() {
    return {
        pieces: read(initial),
        orientation: 'white',
        turnColor: 'white',
        coordinates: true,
        ranksPosition: 'right',
        autoCastle: true,
        viewOnly: false,
        disableContextMenu: false,
        addPieceZIndex: false,
        addDimensionsCssVars: false,
        blockTouchScroll: false,
        pieceKey: false,
        highlight: {
            lastMove: true,
            check: true,
        },
        animation: {
            enabled: true,
            duration: 200,
        },
        movable: {
            free: true,
            color: 'both',
            showDests: true,
            events: {},
            rookCastle: true,
        },
        premovable: {
            enabled: true,
            showDests: true,
            castle: true,
            events: {},
        },
        predroppable: {
            enabled: false,
            events: {},
        },
        draggable: {
            enabled: true,
            distance: 3,
            autoDistance: true,
            showGhost: true,
            deleteOnDropOff: false,
        },
        dropmode: {
            active: false,
        },
        selectable: {
            enabled: true,
        },
        stats: {
            // on touchscreen, default to "tap-tap" moves
            // instead of drag
            dragged: !('ontouchstart' in window),
        },
        events: {},
        drawable: {
            enabled: true,
            visible: true,
            defaultSnapToValidMove: true,
            eraseOnClick: true,
            shapes: [],
            autoShapes: [],
            brushes: {
                green: { key: 'g', color: '#15781B', opacity: 1, lineWidth: 10 },
                red: { key: 'r', color: '#882020', opacity: 1, lineWidth: 10 },
                blue: { key: 'b', color: '#003088', opacity: 1, lineWidth: 10 },
                yellow: { key: 'y', color: '#e68f00', opacity: 1, lineWidth: 10 },
                paleBlue: { key: 'pb', color: '#003088', opacity: 0.4, lineWidth: 15 },
                paleGreen: { key: 'pg', color: '#15781B', opacity: 0.4, lineWidth: 15 },
                paleRed: { key: 'pr', color: '#882020', opacity: 0.4, lineWidth: 15 },
                paleGrey: {
                    key: 'pgr',
                    color: '#4a4a4a',
                    opacity: 0.35,
                    lineWidth: 15,
                },
            },
            prevSvgHash: '',
        },
        hold: timer(),
    };
}

// append and remove only. No updates.
function syncShapes(shapes, root, renderShape) {
    const hashesInDom = new Map(), // by hash
    toRemove = [];
    for (const sc of shapes)
        hashesInDom.set(sc.hash, false);
    let el = root.firstChild, elHash;
    while (el) {
        elHash = el.getAttribute('cgHash');
        // found a shape element that's here to stay
        if (hashesInDom.has(elHash))
            hashesInDom.set(elHash, true);
        // or remove it
        else
            toRemove.push(el);
        el = el.nextSibling;
    }
    // remove old shapes
    for (const el of toRemove)
        root.removeChild(el);
    // insert shapes that are not yet in dom
    for (const sc of shapes) {
        if (!hashesInDom.get(sc.hash))
            root.appendChild(renderShape(sc));
    }
}

function createElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}
function renderSvg(state, svg, customSvg) {
    const d = state.drawable, curD = d.current, cur = curD && curD.mouseSq ? curD : undefined, arrowDests = new Map(), bounds = state.dom.bounds(), nonPieceAutoShapes = d.autoShapes.filter(autoShape => !autoShape.piece);
    for (const s of d.shapes.concat(nonPieceAutoShapes).concat(cur ? [cur] : [])) {
        if (s.dest)
            arrowDests.set(s.dest, (arrowDests.get(s.dest) || 0) + 1);
    }
    const shapes = d.shapes.concat(nonPieceAutoShapes).map((s) => {
        return {
            shape: s,
            current: false,
            hash: shapeHash(s, arrowDests, false, bounds),
        };
    });
    if (cur)
        shapes.push({
            shape: cur,
            current: true,
            hash: shapeHash(cur, arrowDests, true, bounds),
        });
    const fullHash = shapes.map(sc => sc.hash).join(';');
    if (fullHash === state.drawable.prevSvgHash)
        return;
    state.drawable.prevSvgHash = fullHash;
    /*
      -- DOM hierarchy --
      <svg class="cg-shapes">      (<= svg)
        <defs>
          ...(for brushes)...
        </defs>
        <g>
          ...(for arrows and circles)...
        </g>
      </svg>
      <svg class="cg-custom-svgs"> (<= customSvg)
        <g>
          ...(for custom svgs)...
        </g>
      </svg>
    */
    const defsEl = svg.querySelector('defs');
    const shapesEl = svg.querySelector('g');
    const customSvgsEl = customSvg.querySelector('g');
    syncDefs(d, shapes, defsEl);
    syncShapes(shapes.filter(s => !s.shape.customSvg), shapesEl, shape => renderShape$1(state, shape, d.brushes, arrowDests, bounds));
    syncShapes(shapes.filter(s => s.shape.customSvg), customSvgsEl, shape => renderShape$1(state, shape, d.brushes, arrowDests, bounds));
}
// append only. Don't try to update/remove.
function syncDefs(d, shapes, defsEl) {
    const brushes = new Map();
    let brush;
    for (const s of shapes) {
        if (s.shape.dest) {
            brush = d.brushes[s.shape.brush];
            if (s.shape.modifiers)
                brush = makeCustomBrush(brush, s.shape.modifiers);
            brushes.set(brush.key, brush);
        }
    }
    const keysInDom = new Set();
    let el = defsEl.firstChild;
    while (el) {
        keysInDom.add(el.getAttribute('cgKey'));
        el = el.nextSibling;
    }
    for (const [key, brush] of brushes.entries()) {
        if (!keysInDom.has(key))
            defsEl.appendChild(renderMarker(brush));
    }
}
function shapeHash({ orig, dest, brush, piece, modifiers, customSvg }, arrowDests, current, bounds) {
    return [
        bounds.width,
        bounds.height,
        current,
        orig,
        dest,
        brush,
        dest && (arrowDests.get(dest) || 0) > 1,
        piece && pieceHash(piece),
        modifiers && modifiersHash(modifiers),
        customSvg && customSvgHash(customSvg),
    ]
        .filter(x => x)
        .join(',');
}
function pieceHash(piece) {
    return [piece.color, piece.role, piece.scale].filter(x => x).join(',');
}
function modifiersHash(m) {
    return '' + (m.lineWidth || '');
}
function customSvgHash(s) {
    // Rolling hash with base 31 (cf. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h + s.charCodeAt(i)) >>> 0;
    }
    return 'custom-' + h.toString();
}
function renderShape$1(state, { shape, current, hash }, brushes, arrowDests, bounds) {
    let el;
    const orig = orient(key2pos(shape.orig), state.orientation);
    if (shape.customSvg) {
        el = renderCustomSvg(shape.customSvg, orig, bounds);
    }
    else {
        if (shape.dest) {
            let brush = brushes[shape.brush];
            if (shape.modifiers)
                brush = makeCustomBrush(brush, shape.modifiers);
            el = renderArrow(brush, orig, orient(key2pos(shape.dest), state.orientation), current, (arrowDests.get(shape.dest) || 0) > 1, bounds);
        }
        else
            el = renderCircle(brushes[shape.brush], orig, current, bounds);
    }
    el.setAttribute('cgHash', hash);
    return el;
}
function renderCustomSvg(customSvg, pos, bounds) {
    const [x, y] = pos2user(pos, bounds);
    // Translate to top-left of `orig` square
    const g = setAttributes(createElement('g'), { transform: `translate(${x},${y})` });
    // Give 100x100 coordinate system to the user for `orig` square
    const svg = setAttributes(createElement('svg'), { width: 1, height: 1, viewBox: '0 0 100 100' });
    g.appendChild(svg);
    svg.innerHTML = customSvg;
    return g;
}
function renderCircle(brush, pos, current, bounds) {
    const o = pos2user(pos, bounds), widths = circleWidth(), radius = (bounds.width + bounds.height) / (4 * Math.max(bounds.width, bounds.height));
    return setAttributes(createElement('circle'), {
        stroke: brush.color,
        'stroke-width': widths[current ? 0 : 1],
        fill: 'none',
        opacity: opacity(brush, current),
        cx: o[0],
        cy: o[1],
        r: radius - widths[1] / 2,
    });
}
function renderArrow(brush, orig, dest, current, shorten, bounds) {
    const m = arrowMargin(shorten && !current), a = pos2user(orig, bounds), b = pos2user(dest, bounds), dx = b[0] - a[0], dy = b[1] - a[1], angle = Math.atan2(dy, dx), xo = Math.cos(angle) * m, yo = Math.sin(angle) * m;
    return setAttributes(createElement('line'), {
        stroke: brush.color,
        'stroke-width': lineWidth(brush, current),
        'stroke-linecap': 'round',
        'marker-end': 'url(#arrowhead-' + brush.key + ')',
        opacity: opacity(brush, current),
        x1: a[0],
        y1: a[1],
        x2: b[0] - xo,
        y2: b[1] - yo,
    });
}
function renderMarker(brush) {
    const marker = setAttributes(createElement('marker'), {
        id: 'arrowhead-' + brush.key,
        orient: 'auto',
        markerWidth: 4,
        markerHeight: 8,
        refX: 2.05,
        refY: 2.01,
    });
    marker.appendChild(setAttributes(createElement('path'), {
        d: 'M0,0 V4 L3,2 Z',
        fill: brush.color,
    }));
    marker.setAttribute('cgKey', brush.key);
    return marker;
}
function setAttributes(el, attrs) {
    for (const key in attrs)
        el.setAttribute(key, attrs[key]);
    return el;
}
function orient(pos, color) {
    return color === 'white' ? pos : [7 - pos[0], 7 - pos[1]];
}
function makeCustomBrush(base, modifiers) {
    return {
        color: base.color,
        opacity: Math.round(base.opacity * 10) / 10,
        lineWidth: Math.round(modifiers.lineWidth || base.lineWidth),
        key: [base.key, modifiers.lineWidth].filter(x => x).join(''),
    };
}
function circleWidth() {
    return [3 / 64, 4 / 64];
}
function lineWidth(brush, current) {
    return ((brush.lineWidth || 10) * (current ? 0.85 : 1)) / 64;
}
function opacity(brush, current) {
    return (brush.opacity || 1) * (current ? 0.9 : 1);
}
function arrowMargin(shorten) {
    return (shorten ? 20 : 10) / 64;
}
function pos2user(pos, bounds) {
    const xScale = Math.min(1, bounds.width / bounds.height);
    const yScale = Math.min(1, bounds.height / bounds.width);
    return [(pos[0] - 3.5) * xScale, (3.5 - pos[1]) * yScale];
}

function renderWrap(element, s) {
    // .cg-wrap (element passed to Chessground)
    //   cg-container
    //     cg-board
    //     svg.cg-shapes
    //       defs
    //       g
    //     svg.cg-custom-svgs
    //       g
    //     cg-auto-pieces
    //     coords.ranks
    //     coords.files
    //     piece.ghost
    element.innerHTML = '';
    // ensure the cg-wrap class is set
    // so bounds calculation can use the CSS width/height values
    // add that class yourself to the element before calling chessground
    // for a slight performance improvement! (avoids recomputing style)
    element.classList.add('cg-wrap');
    for (const c of colors)
        element.classList.toggle('orientation-' + c, s.orientation === c);
    element.classList.toggle('manipulable', !s.viewOnly);
    const container = createEl('cg-container');
    element.appendChild(container);
    const board = createEl('cg-board');
    container.appendChild(board);
    let svg;
    let customSvg;
    let autoPieces;
    if (s.drawable.visible) {
        svg = setAttributes(createElement('svg'), {
            class: 'cg-shapes',
            viewBox: '-4 -4 8 8',
            preserveAspectRatio: 'xMidYMid slice',
        });
        svg.appendChild(createElement('defs'));
        svg.appendChild(createElement('g'));
        customSvg = setAttributes(createElement('svg'), {
            class: 'cg-custom-svgs',
            viewBox: '-3.5 -3.5 8 8',
            preserveAspectRatio: 'xMidYMid slice',
        });
        customSvg.appendChild(createElement('g'));
        autoPieces = createEl('cg-auto-pieces');
        container.appendChild(svg);
        container.appendChild(customSvg);
        container.appendChild(autoPieces);
    }
    if (s.coordinates) {
        const orientClass = s.orientation === 'black' ? ' black' : '';
        const ranksPositionClass = s.ranksPosition === 'left' ? ' left' : '';
        container.appendChild(renderCoords(ranks, 'ranks' + orientClass + ranksPositionClass));
        container.appendChild(renderCoords(files, 'files' + orientClass));
    }
    let ghost;
    if (s.draggable.showGhost) {
        ghost = createEl('piece', 'ghost');
        setVisible(ghost, false);
        container.appendChild(ghost);
    }
    return {
        board,
        container,
        wrap: element,
        ghost,
        svg,
        customSvg,
        autoPieces,
    };
}
function renderCoords(elems, className) {
    const el = createEl('coords', className);
    let f;
    for (const elem of elems) {
        f = createEl('coord');
        f.textContent = elem;
        el.appendChild(f);
    }
    return el;
}

function drop(s, e) {
    if (!s.dropmode.active)
        return;
    unsetPremove(s);
    unsetPredrop(s);
    const piece = s.dropmode.piece;
    if (piece) {
        s.pieces.set('a0', piece);
        const position = eventPosition(e);
        const dest = position && getKeyAtDomPos(position, whitePov(s), s.dom.bounds());
        if (dest)
            dropNewPiece(s, 'a0', dest);
    }
    s.dom.redraw();
}

function bindBoard(s, onResize) {
    const boardEl = s.dom.elements.board;
    if ('ResizeObserver' in window)
        new ResizeObserver(onResize).observe(s.dom.elements.wrap);
    if (s.viewOnly)
        return;
    // Cannot be passive, because we prevent touch scrolling and dragging of
    // selected elements.
    const onStart = startDragOrDraw(s);
    boardEl.addEventListener('touchstart', onStart, {
        passive: false,
    });
    boardEl.addEventListener('mousedown', onStart, {
        passive: false,
    });
    if (s.disableContextMenu || s.drawable.enabled) {
        boardEl.addEventListener('contextmenu', e => e.preventDefault());
    }
}
// returns the unbind function
function bindDocument(s, onResize) {
    const unbinds = [];
    // Old versions of Edge and Safari do not support ResizeObserver. Send
    // chessground.resize if a user action has changed the bounds of the board.
    if (!('ResizeObserver' in window))
        unbinds.push(unbindable(document.body, 'chessground.resize', onResize));
    if (!s.viewOnly) {
        const onmove = dragOrDraw(s, move, move$1);
        const onend = dragOrDraw(s, end, end$1);
        for (const ev of ['touchmove', 'mousemove'])
            unbinds.push(unbindable(document, ev, onmove));
        for (const ev of ['touchend', 'mouseup'])
            unbinds.push(unbindable(document, ev, onend));
        const onScroll = () => s.dom.bounds.clear();
        unbinds.push(unbindable(document, 'scroll', onScroll, { capture: true, passive: true }));
        unbinds.push(unbindable(window, 'resize', onScroll, { passive: true }));
    }
    return () => unbinds.forEach(f => f());
}
function unbindable(el, eventName, callback, options) {
    el.addEventListener(eventName, callback, options);
    return () => el.removeEventListener(eventName, callback, options);
}
function startDragOrDraw(s) {
    return e => {
        if (s.draggable.current)
            cancel(s);
        else if (s.drawable.current)
            cancel$1(s);
        else if (e.shiftKey || isRightButton(e)) {
            if (s.drawable.enabled)
                start$2(s, e);
        }
        else if (!s.viewOnly) {
            if (s.dropmode.active)
                drop(s, e);
            else
                start$1(s, e);
        }
    };
}
function dragOrDraw(s, withDrag, withDraw) {
    return e => {
        if (s.drawable.current) {
            if (s.drawable.enabled)
                withDraw(s, e);
        }
        else if (!s.viewOnly)
            withDrag(s, e);
    };
}

// ported from https://github.com/veloce/lichobile/blob/master/src/js/chessground/view.js
// in case of bugs, blame @veloce
function render$1(s) {
    const asWhite = whitePov(s), posToTranslate$1 = posToTranslate(s.dom.bounds()), boardEl = s.dom.elements.board, pieces = s.pieces, curAnim = s.animation.current, anims = curAnim ? curAnim.plan.anims : new Map(), fadings = curAnim ? curAnim.plan.fadings : new Map(), curDrag = s.draggable.current, squares = computeSquareClasses(s), samePieces = new Set(), sameSquares = new Set(), movedPieces = new Map(), movedSquares = new Map(); // by class name
    let k, el, pieceAtKey, elPieceName, anim, fading, pMvdset, pMvd, sMvdset, sMvd;
    // walk over all board dom elements, apply animations and flag moved pieces
    el = boardEl.firstChild;
    while (el) {
        k = el.cgKey;
        if (isPieceNode(el)) {
            pieceAtKey = pieces.get(k);
            anim = anims.get(k);
            fading = fadings.get(k);
            elPieceName = el.cgPiece;
            // if piece not being dragged anymore, remove dragging style
            if (el.cgDragging && (!curDrag || curDrag.orig !== k)) {
                el.classList.remove('dragging');
                translate(el, posToTranslate$1(key2pos(k), asWhite));
                el.cgDragging = false;
            }
            // remove fading class if it still remains
            if (!fading && el.cgFading) {
                el.cgFading = false;
                el.classList.remove('fading');
            }
            // there is now a piece at this dom key
            if (pieceAtKey) {
                // continue animation if already animating and same piece
                // (otherwise it could animate a captured piece)
                if (anim && el.cgAnimating && elPieceName === pieceNameOf(pieceAtKey)) {
                    const pos = key2pos(k);
                    pos[0] += anim[2];
                    pos[1] += anim[3];
                    el.classList.add('anim');
                    translate(el, posToTranslate$1(pos, asWhite));
                }
                else if (el.cgAnimating) {
                    el.cgAnimating = false;
                    el.classList.remove('anim');
                    translate(el, posToTranslate$1(key2pos(k), asWhite));
                    if (s.addPieceZIndex)
                        el.style.zIndex = posZIndex(key2pos(k), asWhite);
                }
                // same piece: flag as same
                if (elPieceName === pieceNameOf(pieceAtKey) && (!fading || !el.cgFading)) {
                    samePieces.add(k);
                }
                // different piece: flag as moved unless it is a fading piece
                else {
                    if (fading && elPieceName === pieceNameOf(fading)) {
                        el.classList.add('fading');
                        el.cgFading = true;
                    }
                    else {
                        appendValue(movedPieces, elPieceName, el);
                    }
                }
            }
            // no piece: flag as moved
            else {
                appendValue(movedPieces, elPieceName, el);
            }
        }
        else if (isSquareNode(el)) {
            const cn = el.className;
            if (squares.get(k) === cn)
                sameSquares.add(k);
            else
                appendValue(movedSquares, cn, el);
        }
        el = el.nextSibling;
    }
    // walk over all squares in current set, apply dom changes to moved squares
    // or append new squares
    for (const [sk, className] of squares) {
        if (!sameSquares.has(sk)) {
            sMvdset = movedSquares.get(className);
            sMvd = sMvdset && sMvdset.pop();
            const translation = posToTranslate$1(key2pos(sk), asWhite);
            if (sMvd) {
                sMvd.cgKey = sk;
                translate(sMvd, translation);
            }
            else {
                const squareNode = createEl('square', className);
                squareNode.cgKey = sk;
                translate(squareNode, translation);
                boardEl.insertBefore(squareNode, boardEl.firstChild);
            }
        }
    }
    // walk over all pieces in current set, apply dom changes to moved pieces
    // or append new pieces
    for (const [k, p] of pieces) {
        anim = anims.get(k);
        if (!samePieces.has(k)) {
            pMvdset = movedPieces.get(pieceNameOf(p));
            pMvd = pMvdset && pMvdset.pop();
            // a same piece was moved
            if (pMvd) {
                // apply dom changes
                pMvd.cgKey = k;
                if (pMvd.cgFading) {
                    pMvd.classList.remove('fading');
                    pMvd.cgFading = false;
                }
                const pos = key2pos(k);
                if (s.addPieceZIndex)
                    pMvd.style.zIndex = posZIndex(pos, asWhite);
                if (anim) {
                    pMvd.cgAnimating = true;
                    pMvd.classList.add('anim');
                    pos[0] += anim[2];
                    pos[1] += anim[3];
                }
                translate(pMvd, posToTranslate$1(pos, asWhite));
            }
            // no piece in moved obj: insert the new piece
            // assumes the new piece is not being dragged
            else {
                const pieceName = pieceNameOf(p), pieceNode = createEl('piece', pieceName), pos = key2pos(k);
                pieceNode.cgPiece = pieceName;
                pieceNode.cgKey = k;
                if (anim) {
                    pieceNode.cgAnimating = true;
                    pos[0] += anim[2];
                    pos[1] += anim[3];
                }
                translate(pieceNode, posToTranslate$1(pos, asWhite));
                if (s.addPieceZIndex)
                    pieceNode.style.zIndex = posZIndex(pos, asWhite);
                boardEl.appendChild(pieceNode);
            }
        }
    }
    // remove any element that remains in the moved sets
    for (const nodes of movedPieces.values())
        removeNodes(s, nodes);
    for (const nodes of movedSquares.values())
        removeNodes(s, nodes);
}
function renderResized$1(s) {
    const asWhite = whitePov(s), posToTranslate$1 = posToTranslate(s.dom.bounds());
    let el = s.dom.elements.board.firstChild;
    while (el) {
        if ((isPieceNode(el) && !el.cgAnimating) || isSquareNode(el)) {
            translate(el, posToTranslate$1(key2pos(el.cgKey), asWhite));
        }
        el = el.nextSibling;
    }
}
function updateBounds(s) {
    const bounds = s.dom.elements.wrap.getBoundingClientRect();
    const container = s.dom.elements.container;
    const ratio = bounds.height / bounds.width;
    const width = (Math.floor((bounds.width * window.devicePixelRatio) / 8) * 8) / window.devicePixelRatio;
    const height = width * ratio;
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    s.dom.bounds.clear();
    if (s.addDimensionsCssVars) {
        document.documentElement.style.setProperty('--cg-width', width + 'px');
        document.documentElement.style.setProperty('--cg-height', height + 'px');
    }
}
function isPieceNode(el) {
    return el.tagName === 'PIECE';
}
function isSquareNode(el) {
    return el.tagName === 'SQUARE';
}
function removeNodes(s, nodes) {
    for (const node of nodes)
        s.dom.elements.board.removeChild(node);
}
function posZIndex(pos, asWhite) {
    const minZ = 3;
    const rank = pos[1];
    const z = asWhite ? minZ + 7 - rank : minZ + rank;
    return `${z}`;
}
function pieceNameOf(piece) {
    return `${piece.color} ${piece.role}`;
}
function computeSquareClasses(s) {
    var _a;
    const squares = new Map();
    if (s.lastMove && s.highlight.lastMove)
        for (const k of s.lastMove) {
            addSquare(squares, k, 'last-move');
        }
    if (s.check && s.highlight.check)
        addSquare(squares, s.check, 'check');
    if (s.selected) {
        addSquare(squares, s.selected, 'selected');
        if (s.movable.showDests) {
            const dests = (_a = s.movable.dests) === null || _a === void 0 ? void 0 : _a.get(s.selected);
            if (dests)
                for (const k of dests) {
                    addSquare(squares, k, 'move-dest' + (s.pieces.has(k) ? ' oc' : ''));
                }
            const pDests = s.premovable.dests;
            if (pDests)
                for (const k of pDests) {
                    addSquare(squares, k, 'premove-dest' + (s.pieces.has(k) ? ' oc' : ''));
                }
        }
    }
    const premove = s.premovable.current;
    if (premove)
        for (const k of premove)
            addSquare(squares, k, 'current-premove');
    else if (s.predroppable.current)
        addSquare(squares, s.predroppable.current.key, 'current-premove');
    const o = s.exploding;
    if (o)
        for (const k of o.keys)
            addSquare(squares, k, 'exploding' + o.stage);
    return squares;
}
function addSquare(squares, key, klass) {
    const classes = squares.get(key);
    if (classes)
        squares.set(key, `${classes} ${klass}`);
    else
        squares.set(key, klass);
}
function appendValue(map, key, value) {
    const arr = map.get(key);
    if (arr)
        arr.push(value);
    else
        map.set(key, [value]);
}

function render(state, autoPieceEl) {
    const autoPieces = state.drawable.autoShapes.filter(autoShape => autoShape.piece);
    const autoPieceShapes = autoPieces.map((s) => {
        return {
            shape: s,
            hash: hash(s),
            current: false,
        };
    });
    syncShapes(autoPieceShapes, autoPieceEl, shape => renderShape(state, shape, state.dom.bounds()));
}
function renderResized(state) {
    var _a;
    const asWhite = whitePov(state), posToTranslate$1 = posToTranslate(state.dom.bounds());
    let el = (_a = state.dom.elements.autoPieces) === null || _a === void 0 ? void 0 : _a.firstChild;
    while (el) {
        translateAndScale(el, posToTranslate$1(key2pos(el.cgKey), asWhite), el.cgScale);
        el = el.nextSibling;
    }
}
function renderShape(state, { shape, hash }, bounds) {
    var _a, _b, _c;
    const orig = shape.orig;
    const role = (_a = shape.piece) === null || _a === void 0 ? void 0 : _a.role;
    const color = (_b = shape.piece) === null || _b === void 0 ? void 0 : _b.color;
    const scale = (_c = shape.piece) === null || _c === void 0 ? void 0 : _c.scale;
    const pieceEl = createEl('piece', `${role} ${color}`);
    pieceEl.setAttribute('cgHash', hash);
    pieceEl.cgKey = orig;
    pieceEl.cgScale = scale;
    translateAndScale(pieceEl, posToTranslate(bounds)(key2pos(orig), whitePov(state)), scale);
    return pieceEl;
}
function hash(autoPiece) {
    var _a, _b, _c;
    return [autoPiece.orig, (_a = autoPiece.piece) === null || _a === void 0 ? void 0 : _a.role, (_b = autoPiece.piece) === null || _b === void 0 ? void 0 : _b.color, (_c = autoPiece.piece) === null || _c === void 0 ? void 0 : _c.scale].join(',');
}

function Chessground(element, config) {
    const maybeState = defaults();
    configure(maybeState, config || {});
    function redrawAll() {
        const prevUnbind = 'dom' in maybeState ? maybeState.dom.unbind : undefined;
        // compute bounds from existing board element if possible
        // this allows non-square boards from CSS to be handled (for 3D)
        const elements = renderWrap(element, maybeState), bounds = memo(() => elements.board.getBoundingClientRect()), redrawNow = (skipSvg) => {
            render$1(state);
            if (elements.autoPieces)
                render(state, elements.autoPieces);
            if (!skipSvg && elements.svg)
                renderSvg(state, elements.svg, elements.customSvg);
        }, onResize = () => {
            updateBounds(state);
            renderResized$1(state);
            if (elements.autoPieces)
                renderResized(state);
        };
        const state = maybeState;
        state.dom = {
            elements,
            bounds,
            redraw: debounceRedraw(redrawNow),
            redrawNow,
            unbind: prevUnbind,
        };
        state.drawable.prevSvgHash = '';
        updateBounds(state);
        redrawNow(false);
        bindBoard(state, onResize);
        if (!prevUnbind)
            state.dom.unbind = bindDocument(state, onResize);
        state.events.insert && state.events.insert(elements);
        return state;
    }
    return start(redrawAll(), redrawAll);
}
function debounceRedraw(redrawNow) {
    let redrawing = false;
    return () => {
        if (redrawing)
            return;
        redrawing = true;
        requestAnimationFrame(() => {
            redrawNow();
            redrawing = false;
        });
    };
}

const PIECE_STYLES = [
    "alpha",
    "california",
    "cardinal",
    "cburnett",
    "chess7",
    "chessnut",
    "companion",
    "dubrovny",
    "fantasy",
    "fresca",
    "gioco",
    "governor",
    "horsey",
    "icpieces",
    "kosal",
    "leipzig",
    "letter",
    "libra",
    "maestro",
    "merida",
    "pirouetti",
    "pixel",
    "reillycraig",
    "riohacha",
    "shapes",
    "spatial",
    "staunty",
    "tatiana",
];
const BOARD_STYLES = ["blue", "brown", "green", "ic", "purple"];
function parse_user_config(settings, content) {
    let userConfig = Object.assign(Object.assign({}, settings), { fen: "" });
    try {
        return Object.assign(Object.assign({}, userConfig), obsidian.parseYaml(content));
    }
    catch (e) {
        // failed to parse
        return userConfig;
    }
}

class StartingPosition {
    constructor(eco, name, fen, wikiPath, moves) {
        this.eco = eco;
        this.name = name;
        this.fen = fen;
        this.wikiPath = wikiPath;
        this.moves = moves;
    }
}
class Category {
    constructor(id, items) {
        this.id = id;
        this.items = items;
    }
}
const categories = [
    new Category("e4", [
        new StartingPosition("B00", "King's Pawn", "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1", "King's_Pawn_Game", ["e4"]),
        new StartingPosition("B00", "Open Game", "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "Open_Game", ["e4 e5"]),
        new StartingPosition("B02", "Alekhine's Defence", "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2", "Alekhine's_Defence", ["e4 Nf6"]),
        new StartingPosition("B04", "Alekhine's Defence: Modern Variation", "rnbqkb1r/ppp1pppp/3p4/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 1 4", "Alekhine's_Defence#Modern_Variation:_3.d4_d6_4.Nf3", ["e4 Nf6", "e5 Nd5", "d4 d6", "Nf3"]),
        new StartingPosition("C23", "Bishop's Opening", "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2", "Bishop%27s_Opening", ["e4 e5", "Bc4"]),
        new StartingPosition("B10", "Caro-Kann Defence", "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "Caro–Kann_Defence", ["e4 c6"]),
        new StartingPosition("B12", "Caro-Kann Defence: Advance Variation", "rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "Caro–Kann_Defence#Advance_Variation:_3.e5", ["e4 c6", "d4 d5", "e5"]),
        new StartingPosition("B18", "Caro-Kann Defence: Classical Variation", "rn1qkbnr/pp2pppp/2p5/5b2/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5", "Caro–Kann_Defence#Classical_Variation:_4...Bf5", ["e4 c6", "d4 d5", "Nc3 dxe4", "Nxe4 Bf5"]),
        new StartingPosition("B13", "Caro-Kann Defence: Exchange Variation", "rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "Caro%E2%80%93Kann_Defence#Exchange_Variation:_3.exd5_cxd5", ["e4 c6", "d4 d5", "exd5"]),
        new StartingPosition("B14", "Caro-Kann Defence: Panov-Botvinnik Attack", "rnbqkb1r/pp2pppp/5n2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR b KQkq - 2 5", "Caro–Kann_Defence#Panov.E2.80.93Botvinnik_Attack:_4.c4", ["e4 c6", "d4 d5", "exd5 cxd5", "c4 Nf6", "Nc3"]),
        new StartingPosition("B17", "Caro-Kann Defence: Steinitz Variation", "r1bqkbnr/pp1npppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5", "Caro–Kann_Defence#Modern_Variation:_4...Nd7", ["e4 c6", "d4 d5", "Nc3 dxe4", "Nxe4 Nd7"]),
        new StartingPosition("C21", "Danish Gambit", "rnbqkbnr/pppp1ppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3", "Danish_Gambit", ["e4 e5", "d4 exd4", "c3"]),
        new StartingPosition("C46", "Four Knights Game", "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4", "Four_Knights_Game", ["e4 e5", "Nf3 Nc6", "Nc3 Nf6"]),
        new StartingPosition("C47", "Four Knights Game: Scotch Variation", "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 4", "Four_Knights_Game#4.d4", ["e4 e5", "Nf3 Nc6", "Nc3 Nf6", "d4"]),
        new StartingPosition("C48", "Four Knights Game: Spanish Variation", "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 5 4", "Four_Knights_Game#4.Bb5", ["e4 e5", "Nf3 Nf6", "Nc3 Nc6", "Bb5"]),
        new StartingPosition("C00", "French Defence", "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "French_Defence", ["e4 e6"]),
        new StartingPosition("C02", "French Defence: Advance Variation", "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "French_Defence#Advance_Variation:_3.e5", ["e4 e6", "d4 d5", "e5"]),
        new StartingPosition("C11", "French Defence: Burn Variation", "rnbqkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR b KQkq - 0 5", "French_Defence#3.Nc3", ["e4 e6", "d4 d5", "Nc3 Nf6", "Bg5 dxe4"]),
        new StartingPosition("C11", "French Defence: Classical Variation", "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4", "French_Defence#Classical_Variation:_3...Nf6", ["e4 e6", "d4 d5", "Nc3 Nf6"]),
        new StartingPosition("C01", "French Defence: Exchange Variation", "rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "French_Defence#Exchange_Variation:_3.exd5_exd5", ["e4 e6", "d4 d5", "exd5"]),
        new StartingPosition("C10", "French Defence: Rubinstein Variation", "rnbqkbnr/ppp2ppp/4p3/8/3Pp3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4", "French_Defence#Rubinstein_Variation:_3...dxe4", ["e4 e6", "d4 d5", "Nc3 dxe4"]),
        new StartingPosition("C03", "French Defence: Tarrasch Variation", "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3", "French_Defence#Tarrasch_Variation:_3.Nd2", ["e4 e6", "d4 d5", "Nd2"]),
        new StartingPosition("C15", "French Defence: Winawer Variation", "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4", "French_Defence#Winawer_Variation:_3...Bb4", ["e4 e6", "d4 d5", "Nc3 Bb4"]),
        new StartingPosition("C50", "Giuoco Piano", "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "Giuoco_Piano", ["e4 e5", "Nf3 Nc6", "Bc4 Bc5"]),
        new StartingPosition("C50", "Italian Game", "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3", "Italian_Game", ["e4 e5", "Nf3 Nc6", "Bc4"]),
        new StartingPosition("C51", "Evans Gambit", "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 4", "Evans_Gambit", ["e4 e5", "Nf3 Nc6", "Bc4 Bc5", "b4"]),
        new StartingPosition("C50", "Italian Game: Hungarian Defence", "r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "Hungarian_Defense", ["e4 e5", "Nf3 Nc6", "Bc4 Be7"]),
        new StartingPosition("C55", "Italian Game: Two Knights Defence", "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "Two_Knights_Defense", ["e4 e5", "Nf3 Nc6", "Bc4 Nf6"]),
        new StartingPosition("C30", "King's Gambit", "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2", "King's_Gambit", ["e4 e5", "f4"]),
        new StartingPosition("C33", "King's Gambit Accepted", "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3", "King's_Gambit#King.27s_Gambit_Accepted:_2...exf4", ["e4 e5", "f4 exf4"]),
        new StartingPosition("C33", "King's Gambit Accepted: Bishop's Gambit", "rnbqkbnr/pppp1ppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR b KQkq - 1 3", "King's_Gambit#King.27s_Gambit_Accepted:_2...exf4", ["e4 e5", "f4 exf4", "Bc4"]),
        new StartingPosition("C36", "King's Gambit Accepted: Modern Defence", "rnbqkbnr/ppp2ppp/8/3p4/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq d6 0 4", "King's_Gambit#Modern_Defence:_3...d5", ["e4 e5", "f4 exf4", "Nf3 d5"]),
        new StartingPosition("C30", "King's Gambit Accepted: Classical Variation", "rnbqkbnr/pppp1p1p/8/6p1/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 0 4", "King's_Gambit#Classical_Variation:_3...g5", ["e4 e5", "f4 exf4", "Nf3 g5"]),
        new StartingPosition("C30", "King's Gambit Declined: Classical Variation", "rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3", "King's_Gambit#Classical_Defence:_2...Bc5", ["e4 e5", "f4 Bc5"]),
        new StartingPosition("C31", "King's Gambit: Falkbeer Countergambit", "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3", "King%27s_Gambit,_Falkbeer_Countergambit", ["e4 e5", "f4 d5"]),
        new StartingPosition("B06", "Modern Defence", "rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "Modern_Defense", ["e4 g6"]),
        new StartingPosition("B06", "Modern Defence: Robatsch Defence", "rnbqk1nr/ppppppbp/6p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 3", "Modern_Defense", ["e4 g6", "d4 Bg7", "Nc3"]),
        new StartingPosition("C41", "Philidor Defence", "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3", "Philidor_Defence", ["e4 e5", "Nf3 d6"]),
        new StartingPosition("C41", "Philidor Defence: Lion Variation", "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 2 5", "Philidor_Defence", ["e4 d6", "d4 Nf6", "Nc3 e5", "Nf3 Nbd7"]),
        new StartingPosition("B07", "Lion Variation: Anti-Philidor", "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PPP2/2N5/PPP3PP/R1BQKBNR w KQkq - 0 5", "Philidor_Defence", ["e4 d6", "d4 Nf6", "Nc3 Nbd7", "f4 e5"]),
        new StartingPosition("B07", "Pirc Defence", "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 2 3", "Pirc_Defence", ["e4 d6", "d4 Nf6", "Nc3"]),
        new StartingPosition("B09", "Pirc Defence: Austrian Attack", "rnbqkb1r/ppp1pp1p/3p1np1/8/3PPP2/2N5/PPP3PP/R1BQKBNR b KQkq - 0 4", "Pirc_Defence#Austrian_Attack:_4.f4", ["e4 d6", "d4 Nf6", "Nc3 g6", "f4"]),
        new StartingPosition("B07", "Pirc Defence: Classical Variation", "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 4", "Pirc_Defence#Classical_.28Two_Knights.29_System:_4.Nf3", ["e4 d6", "d4 Nf6", "Nc3 g6", "Nf3"]),
        new StartingPosition("B07", "Pirc Defence: Lion Variation", "r1bqkb1r/pppnpppp/3p1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 3 4", "Pirc_Defence#Classical_.28Two_Knights.29_System", ["e4 d6", "d4 Nf6", "Nc3 Nbd7"]),
        new StartingPosition("C42", "Petrov's Defence", "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", "Petrov's_Defence", ["e4 e5", "Nf3 Nf6"]),
        new StartingPosition("C42", "Petrov's Defence: Classical Attack", "rnbqkb1r/ppp2ppp/3p4/8/3Pn3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 5", "Petrov's_Defence#3.Nxe5", ["e4 e5", "Nf3 Nf6", "Nxe5 d6", "Nf3 Nxe4", "d4"]),
        new StartingPosition("C43", "Petrov's Defence: Steinitz Attack", "rnbqkb1r/pppp1ppp/5n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3", "Petrov's_Defence#3.d4", ["e4 e5", "Nf3 Nf6", "d4"]),
        new StartingPosition("C42", "Petrov's Defence: Three Knights Game", "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 3 3", "Petrov's_Defence#3.Nc3", ["e4 e5", "Nf3 Nf6", "Nc3"]),
        new StartingPosition("C60", "Ruy Lopez", "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3", "Ruy_Lopez", ["e4 e5", "Nf3 Nc6", "Bb5"]),
        new StartingPosition("C65", "Ruy Lopez: Berlin Defence", "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "Ruy_Lopez#Berlin_Defence:_3...Nf6", ["e4 e5", "Nf3 Nc6", "Bb5 Nf6"]),
        new StartingPosition("C64", "Ruy Lopez: Classical Variation", "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", "Ruy_Lopez#Classical_Defence:_3...Bc5", ["e4 e5", "Nf3 Nc6", "Bb5 Bc5"]),
        new StartingPosition("C84", "Ruy Lopez: Closed Variation", "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 1 7", "Ruy_Lopez#Main_line:_4.Ba4_Nf6_5.0-0_Be7_6.Re1_b5_7.Bb3_d6_8.c3_0-0", ["e4 e5", "Nf3 Nc6", "Bb5 a6", "Ba4 Nf6", "O-O Be7", "Re1 b5", "Bb3"]),
        new StartingPosition("C68", "Ruy Lopez: Exchange Variation", "r1bqkbnr/1ppp1ppp/p1B5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4", "Ruy_Lopez,_Exchange_Variation", ["e4 e5", "Nf3 Nc6", "Bb5 a6", "Bxc6"]),
        new StartingPosition("C89", "Ruy Lopez: Marshall Attack", "r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9", "Ruy_Lopez#Marshall_Attack", ["e4 e5", "Nf3 Nc6", "Bb5 a6", "Ba4 Nf6", "O-O Be7", "Re1 b5", "Bb3 O-O", "c3 d5"]),
        new StartingPosition("C63", "Ruy Lopez: Schliemann Defence", "r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4", "Ruy_Lopez#Schliemann_Defence:_3...f5", ["e4 e5", "Nf3 Nc6", "Bb5 f5"]),
        new StartingPosition("B01", "Scandinavian Defence", "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "Scandinavian_Defense", ["e4 d5"]),
        new StartingPosition("B01", "Scandinavian Defence: Modern Variation", "rnbqkb1r/ppp1pppp/5n2/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "Scandinavian_Defense#2...Nf6", ["e4 d5", "exd5 Nf6", "d4"]),
        new StartingPosition("B01", "Scandinavian Defence: Icelandic-Palme Gambit", "rnbqkb1r/ppp2ppp/4pn2/3P4/2P5/8/PP1P1PPP/RNBQKBNR w KQkq - 0 4", "Scandinavian_Defense#2...Nf6", ["e4 d5", "exd5 Nf6", "c4 e6"]),
        new StartingPosition("C44", "Scotch Game", "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3", "Scotch_Game", ["e4 e5", "Nf3 Nc6", "d4"]),
        new StartingPosition("C45", "Scotch Game: Classical Variation", "r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5", "Scotch_Game,_Classical_Variation", ["e4 e5", "Nf3 Nc6", "d4 exd4", "Nxd4 Bc5"]),
        new StartingPosition("C45", "Scotch Game: Mieses Variation", "r1bqkb1r/p1pp1ppp/2p2n2/4P3/8/8/PPP2PPP/RNBQKB1R b KQkq - 0 6", "Scotch_Game#Schmidt_Variation:_4...Nf6", ["e4 e5", "Nf3 Nc6", "d4 exd4", "Nxd4 Nf6", "Nxc6 bxc6", "e5"]),
        new StartingPosition("C45", "Scotch Game: Steinitz Variation", "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/8/PPP2PPP/RNBQKB1R w KQkq - 1 5", "Scotch_Game#Steinitz_Variation:_4...Qh4.21.3F", ["e4 e5", "Nf3 Nc6", "d4 exd4", "Nxd4 Qh4"]),
        new StartingPosition("B20", "Sicilian Defence", "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2", "Sicilian_Defence", ["e4 c5"]),
        new StartingPosition("B36", "Sicilian Defence: Accelerated Dragon", "r1bqkbnr/pp1ppp1p/2n3p1/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5", "Sicilian_Defence,_Accelerated_Dragon", ["e4 c5", "Nf3 Nc6", "d4 cxd4", "Nxd4 g6"]),
        new StartingPosition("B22", "Sicilian Defence: Alapin Variation", "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2", "Sicilian_Defence,_Alapin_Variation", ["e4 c5", "c3"]),
        new StartingPosition("B23", "Sicilian Defence: Closed Variation", "rnbqkbnr/pp1ppppp/8/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2", "Sicilian_Defence#Closed_Sicilian", ["e4 c5", "Nc3"]),
        new StartingPosition("B70", "Sicilian Defence: Dragon Variation", "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6", "Sicilian_Defence,_Dragon_Variation", ["e4 c5", "Nf3 d6", "d4 cxd4", "Nxd4 Nf6", "Nc3 g6"]),
        new StartingPosition("B23", "Sicilian Defence: Grand Prix Attack", "nbqkbnr/pp1ppppp/8/2p5/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2", "Sicilian_Defence#Grand_Prix_Attack", ["e4 c5", "f4"]),
        new StartingPosition("B27", "Sicilian Defence: Hyper-Accelerated Dragon", "rnbqkbnr/pp1ppp1p/6p1/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3", "Sicilian_Defence#2...g6:_Hungarian_Variation", ["e4 c5", "Nf3 g6"]),
        new StartingPosition("B41", "Sicilian Defence: Kan Variation", "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5", "Sicilian_Defence#Kan_.28Paulsen.29_Variation:_4...a6", ["e4 c5", "Nf3 e6", "d4 cxd4", "Nxd4 a6"]),
        new StartingPosition("B90", "Sicilian Defence: Najdorf Variation", "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6", "Sicilian_Defence,_Najdorf_Variation", ["e4 c5", "Nf3 d6", "d4 cxd4", "Nxd4 Nf6", "Nc3 a6"]),
        new StartingPosition("B60", "Sicilian Defence: Richter-Rauzer Variation", "r1bqkb1r/pp2pppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R b KQkq - 4 6", "Sicilian_Defence#Classical_Variation:_5...Nc6", ["e4 c5", "Nf3 d6", "d4 cxd4", "Nxd4 Nf6", "Nc3 Nc6", "Bg5"]),
        new StartingPosition("B80", "Sicilian Defence: Scheveningen Variation", "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6", "Sicilian_Defence,_Scheveningen_Variation", ["e4 c5", "Nf3 d6", "d4 cxd4", "Nxd4 Nf6", "Nc3 e6"]),
        new StartingPosition("B21", "Sicilian Defence: Smith-Morra Gambit", "rnbqkbnr/pp1ppppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3", "Sicilian_Defence,_Smith–Morra_Gambit", ["e4 c5", "d4 cxd4", "c3"]),
        new StartingPosition("C25", "Vienna Game", "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2", "Vienna_Game", ["e4 e5", " Nc3"]),
        new StartingPosition("C27", "Vienna Game: Frankenstein-Dracula Variation", "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 0 4", "Frankenstein-Dracula_Variation", ["e4 e5", "Nc3 Nf6", "Bc4 Nxe4"]),
        new StartingPosition("C46", "Four Knights Game: Halloween Gambit", "r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/2N5/PPPP1PPP/R1BQKB1R b KQkq - 0 4", "Halloween_Gambit", ["e4 e5", "Nf3 Nc6", "Nc3 Nf6", "Nxe5"]),
        new StartingPosition("C20", "King's Pawn Game: Wayward Queen Attack", "rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2", "Danvers_Opening", ["e4 e5", "Qh5"]),
        new StartingPosition("C20", "Bongcloud Attack", "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPKPPP/RNBQ1BNR b kq - 1 2", "Bong", ["e4 e5", "Ke2"]),
    ]),
    new Category("d4", [
        new StartingPosition("A40", "Queen's Pawn", "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1", "Queen's_Pawn_Game", ["d4"]),
        new StartingPosition("A57", "Benko Gambit", "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4", "Benko_Gambit", ["d4 Nf6", "c4 c5", "d5 b5"]),
        new StartingPosition("A61", "Benoni Defence: Modern Benoni", "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4", "Modern_Benoni", ["d4 Nf6", "c4 c5", "d5 e6"]),
        new StartingPosition("A43", "Benoni Defence: Czech Benoni", "rnbqkb1r/pp1p1ppp/5n2/2pPp3/2P5/8/PP2PPPP/RNBQKBNR w KQkq e6 0 4", "Benoni_Defense#Czech_Benoni:_1.d4_Nf6_2.c4_c5_3.d5_e5", ["d4 Nf6", "c4 c5", "d5 e5"]),
        new StartingPosition("D00", "Blackmar Gambit", "rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2", "Blackmar–Diemer_Gambit", ["d4 d5", "e4"]),
        new StartingPosition("E11", "Bogo-Indian Defence", "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4", "Bogo-Indian_Defence", ["d4 Nf6", "c4 e6", "Nf3 Bb4+"]),
        new StartingPosition("E00", "Catalan Opening", "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3", "Catalan_Opening", ["d4 Nf6", "c4 e6", "g3"]),
        new StartingPosition("E06", "Catalan Opening: Closed Variation", "rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 3 5", "Catalan_Opening", ["d4 Nf6", "c4 e6", "g3 d5", "Nf3 Be7", "Bg2"]),
        new StartingPosition("A80", "Dutch Defence", "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2", "Dutch_Defence", ["d4 f5"]),
        new StartingPosition("A96", "Dutch Defence: Classical Variation", "rnbq1rk1/ppp1b1pp/3ppn2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7", "Dutch_Defence", ["d4 f5", "c4 Nf6", "g3 e6", "Bg2 Be7", "Nf3 O-O", "O-O d6"]),
        new StartingPosition("A87", "Dutch Defence: Leningrad Variation", "rnbqk2r/ppppp1bp/5np1/5p2/2PP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 3 5", "Dutch_Defence", ["d4 f5", "c4 Nf6", "g3 g6", "Bg2 Bg7", "Nf3"]),
        new StartingPosition("A83", "Dutch Defence: Staunton Gambit", "rnbqkb1r/ppppp1pp/5n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR b KQkq - 3 4", "Dutch_Defence", ["d4 f5", "e4 fxe4", "Nc3 Nf6", "Bg5"]),
        new StartingPosition("A92", "Dutch Defence: Stonewall Variation", "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7", "Dutch_Defence", ["d4 f5", "c4 Nf6", "g3 e6", "Bg2 Be7", "Nf3 O-O", "O-O d5"]),
        new StartingPosition("D80", "Grünfeld Defence", "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4", "Grünfeld_Defence", ["d4 Nf6", "c4 g6", "Nc3 d5"]),
        new StartingPosition("D82", "Grünfeld Defence: Brinckmann Attack", "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP1B2/2N5/PP2PPPP/R2QKBNR b KQkq - 1 4", "Grünfeld_Defence#Lines_with_4.Bf4_and_the_Gr.C3.BCnfeld_Gambit", ["d4 Nf6", "c4 g6", "Nc3 d5", "Bf4"]),
        new StartingPosition("D85", "Grünfeld Defence: Exchange Variation", "rnbqkb1r/ppp1pp1p/6p1/3n4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5", "Grünfeld_Defence#Exchange_Variation:_4.cxd5_Nxd5_5.e4", ["d4 Nf6", "c4 g6", "Nc3 d5", "cxd5 Nxd5"]),
        new StartingPosition("D80", "Grünfeld Defence: Russian Variation", "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/1QN5/PP2PPPP/R1B1KBNR b KQkq - 1 4", "Grünfeld_Defence#Russian_System:_4.Nf3_Bg7_5.Qb3", ["d4 Nf6", "c4 g6", "Nc3 d5", "Qb3"]),
        new StartingPosition("D90", "Grünfeld Defence: Taimanov Variation", "rnbqk2r/ppp1ppbp/5np1/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5", "Grünfeld_Defence#Taimanov.27s_Variation_with_4.Nf3_Bg7_5.Bg5", ["d4 Nf6", "c4 g6", "Nc3 d5", "Nf3 Bg7", "Bg5"]),
        new StartingPosition("E61", "King's Indian Defence", "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "King's_Indian_Defence", ["d4 Nf6", "c4 g6"]),
        new StartingPosition("E77", "King's Indian Defence: 4.e4", "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5", "King's_Indian_Defence", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "e4 d6"]),
        new StartingPosition("E73", "King's Indian Defence: Averbakh Variation", "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR b KQ - 3 6", "King's_Indian_Defence#Averbakh_Variation:_5.Be2_0-0_6.Bg5", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "e4 d6", "Be2 O-O", "Bg5"]),
        new StartingPosition("E62", "King's Indian Defence: Fianchetto Variation", "rnbqk2r/ppp1ppbp/3p1np1/8/2PP4/2N2NP1/PP2PP1P/R1BQKB1R b KQkq - 0 5", "King's_Indian_Defence#Fianchetto_Variation:_3.Nf3_Bg7_4.g3", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "Nf3 d6", "g3"]),
        new StartingPosition("E76", "King's Indian Defence: Four Pawns Attack", "rnbqk2r/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR b KQkq - 0 5", "King%27s_Indian_Defence,_Four_Pawns_Attack", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "e4 d6", "f4"]),
        new StartingPosition("E91", "King's Indian Defence: Classical Variation", "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 3 6", "King's_Indian_Defence#Classical_Variation:_5.Nf3_0-0_6.Be2_e5", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "e4 d6", "Nf3 O-O", "Be2"]),
        new StartingPosition("E80", "King's Indian Defence: Sämisch Variation", "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQkq - 0 5", "King's_Indian_Defence#S.C3.A4misch_Variation:_5.f3", ["d4 Nf6", "c4 g6", "Nc3 Bg7", "e4 d6", "f3"]),
        new StartingPosition("A41", "Queens's Pawn Game: Modern Defence", "rnbqk1nr/ppp1ppbp/3p2p1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4", "Queen's_Pawn_Game#1...g6", ["d4 g6", "c4 d6", "Nc3 Bg7"]),
        new StartingPosition("E20", "Nimzo-Indian Defence", "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4", "Nimzo-Indian_Defence", ["d4 Nf6", "c4 e6", "Nc3 Bb4"]),
        new StartingPosition("E32", "Nimzo-Indian Defence: Classical Variation", "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR b KQkq - 3 4", "Nimzo-Indian_Defence#Classical_Variation:_4.Qc2", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "Qc2"]),
        new StartingPosition("E43", "Nimzo-Indian Defence: Fischer Variation", "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5", "Nimzo-Indian_Defence#4...b6", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "e3 b6"]),
        new StartingPosition("E41", "Nimzo-Indian Defence: Hübner Variation", "r1bqk2r/pp3ppp/2nppn2/2p5/2PP4/2PBPN2/P4PPP/R1BQK2R w KQkq - 0 8", "Nimzo-Indian_Defence#4...c5", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "e3 c5", "Bd3 Nc6", "Nf3 Bxc3+", "bxc3 d6"]),
        new StartingPosition("E21", "Nimzo-Indian Defence: Kasparov Variation", "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4", "Nimzo-Indian_Defence#Kasparov_Variation:_4.Nf3", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "Nf3"]),
        new StartingPosition("E30", "Nimzo-Indian Defence: Leningrad Variation", "rnbqk2r/pppp1ppp/4pn2/6B1/1bPP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4", "Nimzo-Indian_Defence#Other_variations", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "Bg5"]),
        new StartingPosition("E26", "Nimzo-Indian Defence: Sämisch Variation", "rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR b KQkq - 0 5", "Nimzo-Indian_Defence#Other_variations", ["d4 Nf6", "c4 e6", "Nc3 Bb4", "a3 Bxc3+", "bxc3"]),
        new StartingPosition("A53", "Old Indian Defence", "rnbqkb1r/ppp1pppp/3p1n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "Old_Indian_Defense", ["d4 Nf6", "c4 d6"]),
        new StartingPosition("D06", "Queen's Gambit", "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2", "Queen's_Gambit", ["d4 d5", "c4"]),
        new StartingPosition("D20", "Queen's Gambit Accepted", "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "Queen%27s_Gambit_Accepted", ["d4 d5", "c4 dxc4"]),
        new StartingPosition("D43", "Queen's Gambit Declined: Semi-Slav Defence", "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5", "Semi-Slav_Defense", ["d4 d5", "c4 e6", "Nc3 Nf6", "Nf3 c6"]),
        new StartingPosition("D10", "Queen's Gambit Declined: Slav Defence", "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "Slav_Defense", ["d4 d5", "c4 c6"]),
        new StartingPosition("D40", "Queen's Gambit Declined: Semi-Tarrasch Defence", "rnbqkb1r/pp3ppp/4pn2/2pp4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5", "Tarrasch_Defense#Semi-Tarrasch_Defense", ["d4 d5", "c4 e6", "Nc3 Nf6", "Nf3 c5"]),
        new StartingPosition("D32", "Queen's Gambit Declined: Tarrasch Defence", "rnbqkbnr/pp3ppp/4p3/2pp4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4", "Tarrasch_Defense", ["d4 d5", "c4 e6", "Nc3 c5"]),
        new StartingPosition("D08", "Queen's Gambit: Albin Countergambit", "rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "Albin_Countergambit", ["d4 d5", "c4 e5"]),
        new StartingPosition("D07", "Queen's Gambit: Chigorin Defence", "r1bqkbnr/ppp1pppp/2n5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3", "Chigorin_Defense", ["d4 d5", "c4 Nc6"]),
        new StartingPosition("E12", "Queen's Indian Defence", "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4", "Queen's_Indian_Defense", ["d4 Nf6", "c4 e6", "Nf3 b6"]),
        new StartingPosition("D02", "London System", "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3", "London_System", ["d4 d5", "Nf3 Nf6", "Bf4"]),
        new StartingPosition("D00", "London System: Mason Attack", "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2", "London_System", ["d4 d5", "Bf4"]),
        new StartingPosition("D01", "Rapport-Jobava System", "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/2N5/PPP1PPPP/R2QKBNR b KQkq - 3 3", "London_System", ["d4 d5", "Nc3 Nf6", "Bf4"]),
        new StartingPosition("D03", "Torre Attack", "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3", "Torre_Attack", ["d4 d5", "Nf3 Nf6", "Bg5"]),
        new StartingPosition("D01", "Richter-Veresov Attack", "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/2N5/PPP1PPPP/R2QKBNR b KQkq - 3 3", "Richter-Veresov_Attack", ["d4 d5", "Nc3 Nf6", "Bg5"]),
        new StartingPosition("A52", "Budapest Defence", "rnbqkb1r/pppp1ppp/5n2/4p3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3", "Budapest_Gambit", ["d4 Nf6", "c4 e5"]),
        new StartingPosition("D00", "Closed Game", "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2", "Closed_Game", ["d4 d5"]),
        new StartingPosition("A45", "Trompowsky Attack", "rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2", "Trompowsky_Attack", ["d4 Nf6", "Bg5"]),
    ]),
    new Category("Nf3", [
        new StartingPosition("A04", "Zukertort Opening", "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1", "Zukertort_Opening", ["Nf3"]),
        new StartingPosition("A07", "King's Indian Attack", "rnbqkbnr/ppp1pppp/8/3p4/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 0 2", "King's_Indian_Attack", ["Nf3 d5", "g3"]),
        new StartingPosition("A09", "Réti Opening", "rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 0 2", "Réti_Opening", ["Nf3 d5", "c4"]),
    ]),
    new Category("c4", [
        new StartingPosition("A10", "English Opening", "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1", "English_Opening", ["c4"]),
        new StartingPosition("A20", "English Opening: Reversed Sicilian", "rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2", "English_Opening", ["c4 e5"]),
        new StartingPosition("A30", "English Opening: Symmetrical Variation", "rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2", "English_Opening", ["c4 c5"]),
        new StartingPosition("A26", "English Opening: Closed System", "r1bqk1nr/ppp2pbp/2np2p1/4p3/2P5/2NP2P1/PP2PPBP/R1BQK1NR w KQkq - 0 6", "English_Opening", ["c4 e5", "Nc3 Nc6", "g3 g6", "Bg2 Bg7", "d3 d6"]),
    ]),
    new Category("b3", [
        new StartingPosition("A01", "Nimzo-Larsen Attack", "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1", "Larsen's_Opening", ["b3"]),
    ]),
    new Category("b4", [
        new StartingPosition("A00", "Sokolsky Opening", "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq - 0 1", "Sokolsky_Opening", ["b4"]),
    ]),
    new Category("f4", [
        new StartingPosition("A02", "Bird's Opening", "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1", "Bird's_Opening", ["f4"]),
        new StartingPosition("A02", "Bird's Opening: Dutch Variation", "rnbqkbnr/ppp1pppp/8/3p4/5P2/8/PPPPP1PP/RNBQKBNR w KQkq - 0 2", "Bird's_Opening", ["f4 d5"]),
    ]),
    new Category("g3", [
        new StartingPosition("A00", "Hungarian Opening", "rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1", "King's_Fianchetto_Opening", ["g3"]),
    ]),
];

class ChesserMenu {
    constructor(parentEl, chesser) {
        this.chesser = chesser;
        this.containerEl = parentEl.createDiv("chess-menu-container", (containerEl) => {
            containerEl.createDiv({ cls: "chess-menu-section" }, (sectionEl) => {
                const selectEl = sectionEl.createEl("select", {
                    cls: "dropdown chess-starting-position-dropdown",
                }, (el) => {
                    el.createEl("option", {
                        value: "starting-position",
                        text: "Starting Position",
                    });
                    el.createEl("option", {
                        value: "custom",
                        text: "Custom",
                    });
                    el.createEl("optgroup", {}, (optgroup) => {
                        optgroup.label = "Popular Openings";
                        categories.forEach((category) => {
                            category.items.forEach((item) => {
                                optgroup.createEl("option", {
                                    value: item.eco,
                                    text: item.name,
                                });
                            });
                        });
                    });
                    const startingPosition = this.getStartingPositionFromFen(chesser.getFen());
                    const startingPositionName = startingPosition
                        ? startingPosition.eco
                        : "custom";
                    el.value = startingPositionName;
                });
                selectEl.addEventListener("change", (ev) => {
                    const value = ev.target.value;
                    if (value === "starting-position") {
                        this.chesser.loadFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", []);
                        return;
                    }
                    const startingPosition = categories
                        .flatMap((cat) => cat.items)
                        .find((item) => item.eco === value);
                    this.chesser.loadFen(startingPosition.fen, startingPosition.moves);
                });
                new obsidian.Setting(sectionEl).setName("Enable Free Move?").addToggle((toggle) => {
                    toggle.setValue(this.chesser.getBoardState().movable.free);
                    toggle.onChange((value) => {
                        this.chesser.setFreeMove(value);
                    });
                });
            });
        });
        this.movesListEl = this.containerEl.createDiv({
            cls: "chess-menu-section chess-menu-section-tall",
        });
        this.redrawMoveList();
        this.createToolbar();
    }
    getStartingPositionFromFen(fen) {
        return categories.flatMap((cat) => cat.items).find((item) => item.eco === fen);
    }
    createToolbar() {
        const btnContainer = this.containerEl.createDiv("chess-toolbar-container");
        btnContainer.createEl("a", "view-action", (btn) => {
            btn.ariaLabel = "Flip board";
            obsidian.setIcon(btn, "switch");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.chesser.flipBoard();
            });
        });
        btnContainer.createEl("a", "view-action", (btn) => {
            btn.ariaLabel = "Reset";
            obsidian.setIcon(btn, "restore-file-glyph");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                while (this.chesser.currentMoveIdx >= 0) {
                    this.chesser.undo_move();
                }
            });
        });
        btnContainer.createEl("a", "view-action", (btn) => {
            btn.ariaLabel = "Undo";
            obsidian.setIcon(btn, "left-arrow");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.chesser.undo_move();
            });
        });
        btnContainer.createEl("a", "view-action", (btn) => {
            btn.ariaLabel = "Redo";
            obsidian.setIcon(btn, "right-arrow");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.chesser.redo_move();
            });
        });
        btnContainer.createEl("a", "view-action", (btn) => {
            btn.ariaLabel = "Copy FEN";
            obsidian.setIcon(btn, "two-blank-pages");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(this.chesser.getFen());
            });
        });
    }
    redrawMoveList() {
        this.movesListEl.empty();
        this.movesListEl.createDiv({
            text: this.chesser.turn() === "b" ? "Black's turn" : "White's turn",
            cls: "chess-turn-text",
        });
        this.movesListEl.createDiv("chess-move-list", (moveListEl) => {
            this.chesser.history().forEach((move, idx) => {
                const moveEl = moveListEl.createDiv({
                    cls: `chess-move ${this.chesser.currentMoveIdx === idx ? "chess-move-active" : ""}`,
                    text: move.san,
                });
                moveEl.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    this.chesser.update_turn_idx(idx);
                });
            });
        });
    }
}

function debug(debugFn) {
    if (process.env.DEBUG) {
        debugFn();
    }
}

function draw_chessboard(app, settings) {
    return (source, el, ctx) => {
        let user_config = parse_user_config(settings, source);
        ctx.addChild(new Chesser(el, ctx, user_config, app));
    };
}
function read_state(id) {
    const savedDataStr = localStorage.getItem(`chesser-${id}`);
    try {
        return JSON.parse(savedDataStr);
    }
    catch (e) {
        console.error(e);
    }
    return {};
}
function write_state(id, game_state) {
    localStorage.setItem(`chesser-${id}`, JSON.stringify(game_state));
}
class Chesser extends obsidian.MarkdownRenderChild {
    constructor(containerEl, ctx, user_config, app) {
        var _a, _b, _c;
        super(containerEl);
        this.app = app;
        this.ctx = ctx;
        this.id = (_a = user_config.id) !== null && _a !== void 0 ? _a : nanoid(8);
        this.chess = new chess.Chess();
        const saved_config = read_state(this.id);
        const config = Object.assign({}, user_config, saved_config);
        this.sync_board_with_gamestate = this.sync_board_with_gamestate.bind(this);
        this.save_move = this.save_move.bind(this);
        this.save_shapes = this.save_shapes.bind(this);
        // Save `id` into the codeblock yaml
        if (user_config.id === undefined) {
            this.app.workspace.onLayoutReady(() => {
                window.setImmediate(() => {
                    this.write_config({ id: this.id });
                });
            });
        }
        if (config.pgn) {
            debug(() => console.debug("loading from pgn", config.pgn));
            this.chess.load_pgn(config.pgn);
        }
        else if (config.fen) {
            debug(() => console.debug("loading from fen", config.fen));
            this.chess.load(config.fen);
        }
        this.moves = (_b = config.moves) !== null && _b !== void 0 ? _b : this.chess.history({ verbose: true });
        this.currentMoveIdx = (_c = config.currentMoveIdx) !== null && _c !== void 0 ? _c : this.moves.length - 1;
        let lastMove = undefined;
        if (this.currentMoveIdx >= 0) {
            const move = this.moves[this.currentMoveIdx];
            lastMove = [move.from, move.to];
        }
        // Setup UI
        this.set_style(containerEl, config.pieceStyle, config.boardStyle);
        try {
            this.cg = Chessground(containerEl.createDiv(), {
                fen: this.chess.fen(),
                addDimensionsCssVars: true,
                lastMove,
                orientation: config.orientation,
                viewOnly: config.viewOnly,
                drawable: {
                    enabled: config.drawable,
                    onChange: this.save_shapes,
                },
            });
        }
        catch (e) {
            new obsidian.Notice("Chesser error: Invalid config");
            console.error(e);
            return;
        }
        // Activates the chess logic
        this.setFreeMove(config.free);
        // Draw saved shapes
        if (config.shapes) {
            this.app.workspace.onLayoutReady(() => {
                window.setTimeout(() => {
                    this.sync_board_with_gamestate(false);
                    this.cg.setShapes(config.shapes);
                }, 100);
            });
        }
        this.menu = new ChesserMenu(containerEl, this);
    }
    set_style(el, pieceStyle, boardStyle) {
        el.addClasses([pieceStyle, `${boardStyle}-board`, "chesser-container"]);
    }
    get_section_range() {
        const sectionInfo = this.ctx.getSectionInfo(this.containerEl);
        return [
            {
                line: sectionInfo.lineStart + 1,
                ch: 0,
            },
            {
                line: sectionInfo.lineEnd,
                ch: 0,
            },
        ];
    }
    get_config(view) {
        const [from, to] = this.get_section_range();
        const codeblockText = view.editor.getRange(from, to);
        try {
            return obsidian.parseYaml(codeblockText);
        }
        catch (e) {
            debug(() => console.debug("failed to parse codeblock's yaml config", codeblockText));
            // failed to parse. show error...
        }
        return undefined;
    }
    write_config(config) {
        debug(() => console.debug("writing config to localStorage", config));
        const view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!view) {
            new obsidian.Notice("Chesser: Failed to retrieve active view");
            console.error("Chesser: Failed to retrieve view when writing config");
        }
        try {
            const updated = obsidian.stringifyYaml(Object.assign(Object.assign({}, this.get_config(view)), config));
            const [from, to] = this.get_section_range();
            view.editor.replaceRange(updated, from, to);
        }
        catch (e) {
            // failed to parse. show error...
            console.error("failed to write config", e);
        }
    }
    save_move() {
        const config = read_state(this.id);
        write_state(this.id, Object.assign(Object.assign({}, config), { currentMoveIdx: this.currentMoveIdx, moves: this.moves, pgn: this.chess.pgn() }));
    }
    save_shapes(shapes) {
        const config = read_state(this.id);
        write_state(this.id, Object.assign(Object.assign({}, config), { shapes }));
    }
    sync_board_with_gamestate(shouldSave = true) {
        var _a;
        this.cg.set({
            check: this.check(),
            turnColor: this.color_turn(),
            movable: {
                free: false,
                color: this.color_turn(),
                dests: this.dests(),
            },
        });
        (_a = this.menu) === null || _a === void 0 ? void 0 : _a.redrawMoveList();
        if (shouldSave) {
            this.save_move();
        }
    }
    color_turn() {
        return this.chess.turn() === "w" ? "white" : "black";
    }
    dests() {
        const dests = new Map();
        this.chess.SQUARES.forEach((s) => {
            const ms = this.chess.moves({ square: s, verbose: true });
            if (ms.length)
                dests.set(s, ms.map((m) => m.to));
        });
        return dests;
    }
    check() {
        return this.chess.in_check();
    }
    undo_move() {
        this.update_turn_idx(this.currentMoveIdx - 1);
    }
    redo_move() {
        this.update_turn_idx(this.currentMoveIdx + 1);
    }
    update_turn_idx(moveIdx) {
        if (moveIdx < -1 || moveIdx >= this.moves.length) {
            return;
        }
        const isUndoing = moveIdx < this.currentMoveIdx;
        if (isUndoing) {
            while (this.currentMoveIdx > moveIdx) {
                this.currentMoveIdx--;
                this.chess.undo();
            }
        }
        else {
            while (this.currentMoveIdx < moveIdx) {
                this.currentMoveIdx++;
                const move = this.moves[this.currentMoveIdx];
                this.chess.move(move);
            }
        }
        let lastMove = undefined;
        if (this.currentMoveIdx >= 0) {
            const move = this.moves[this.currentMoveIdx];
            lastMove = [move.from, move.to];
        }
        this.cg.set({
            fen: this.chess.fen(),
            lastMove,
        });
        this.sync_board_with_gamestate();
    }
    setFreeMove(enabled) {
        if (enabled) {
            this.cg.set({
                events: {
                    move: this.save_move,
                },
                movable: {
                    free: true,
                    color: "both",
                    dests: undefined,
                },
            });
        }
        else {
            this.cg.set({
                events: {
                    move: (orig, dest) => {
                        const move = this.chess.move({ from: orig, to: dest });
                        this.currentMoveIdx++;
                        this.moves = [...this.moves.slice(0, this.currentMoveIdx), move];
                        this.sync_board_with_gamestate();
                    },
                },
            });
            this.sync_board_with_gamestate();
        }
    }
    turn() {
        return this.chess.turn();
    }
    history() {
        return this.moves;
    }
    flipBoard() {
        return this.cg.toggleOrientation();
    }
    getBoardState() {
        return this.cg.state;
    }
    getFen() {
        return this.chess.fen();
    }
    loadFen(fen, moves) {
        let lastMove = undefined;
        if (moves) {
            this.currentMoveIdx = -1;
            this.moves = [];
            this.chess.reset();
            moves.forEach((fullMove) => {
                fullMove.split(" ").forEach((halfMove) => {
                    const move = this.chess.move(halfMove);
                    this.moves.push(move);
                    this.currentMoveIdx++;
                });
            });
            if (this.currentMoveIdx >= 0) {
                const move = this.moves[this.currentMoveIdx];
                lastMove = [move.from, move.to];
            }
        }
        else {
            this.chess.load(fen);
        }
        this.cg.set({ fen: this.chess.fen(), lastMove });
        this.sync_board_with_gamestate();
    }
}

const DEFAULT_SETTINGS = {
    orientation: "white",
    viewOnly: false,
    drawable: true,
    free: false,
    pieceStyle: "cburnett",
    boardStyle: "brown",
};
class ChesserSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Obsidian Chess Settings" });
        new obsidian.Setting(containerEl)
            .setName("Piece Style")
            .setDesc("Sets the piece style.")
            .addDropdown((dropdown) => {
            let styles = {};
            PIECE_STYLES.map((style) => (styles[style] = style));
            dropdown.addOptions(styles);
            dropdown.setValue(this.plugin.settings.pieceStyle).onChange((pieceStyle) => {
                this.plugin.settings.pieceStyle = pieceStyle;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Board Style")
            .setDesc("Sets the board style.")
            .addDropdown((dropdown) => {
            let styles = {};
            BOARD_STYLES.map((style) => (styles[style] = style));
            dropdown.addOptions(styles);
            dropdown.setValue(this.plugin.settings.boardStyle).onChange((boardStyle) => {
                this.plugin.settings.boardStyle = boardStyle;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Orientation")
            .setDesc("Sets the default board orientation.")
            .addDropdown((dropdown) => {
            dropdown.addOption("white", "White");
            dropdown.addOption("black", "Black");
            dropdown.setValue(this.plugin.settings.orientation).onChange((orientation) => {
                this.plugin.settings.orientation = orientation;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Drawable")
            .setDesc("Controls the ability to draw annotations (arrows, circles) on the board.")
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.drawable).onChange((drawable) => {
                this.plugin.settings.drawable = drawable;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("View-only")
            .setDesc("If enabled, displays a static chess board (no moves, annotations, ...).")
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.viewOnly).onChange((viewOnly) => {
                this.plugin.settings.viewOnly = viewOnly;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Free")
            .setDesc("If enabled, disables the chess logic, all moves are valid.")
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.free).onChange((free) => {
                this.plugin.settings.free = free;
                this.plugin.saveSettings();
            });
        });
    }
}

class ChesserPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.addSettingTab(new ChesserSettingTab(this.app, this));
            this.registerMarkdownCodeBlockProcessor("chesser", // keep for backwards compatibility/branding
            draw_chessboard(this.app, this.settings));
            this.registerMarkdownCodeBlockProcessor("chess", draw_chessboard(this.app, this.settings));
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = ChesserPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9uYW5vaWQvaW5kZXgucHJvZC5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzcy5qcy9jaGVzcy5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzc2dyb3VuZC90eXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzc2dyb3VuZC91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL3ByZW1vdmUuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvYm9hcmQuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvZmVuLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL2NvbmZpZy5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzc2dyb3VuZC9hbmltLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL2RyYXcuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvZHJhZy5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzc2dyb3VuZC9leHBsb3Npb24uanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvYXBpLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL3N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL3N5bmMuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvc3ZnLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL3dyYXAuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvZHJvcC5qcyIsIm5vZGVfbW9kdWxlcy9jaGVzc2dyb3VuZC9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvcmVuZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NoZXNzZ3JvdW5kL2F1dG9QaWVjZXMuanMiLCJub2RlX21vZHVsZXMvY2hlc3Nncm91bmQvY2hlc3Nncm91bmQuanMiLCJzcmMvQ2hlc3NlckNvbmZpZy50cyIsInNyYy9zdGFydGluZ1Bvc2l0aW9ucy50cyIsInNyYy9tZW51LnRzIiwic3JjL2RlYnVnLnRzIiwic3JjL0NoZXNzZXIudHMiLCJzcmMvQ2hlc3NlclNldHRpbmdzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyB1cmxBbHBoYWJldCB9IGZyb20gJy4vdXJsLWFscGhhYmV0L2luZGV4LmpzJ1xuaWYgKGZhbHNlKSB7XG4gIGlmIChcbiAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnICYmXG4gICAgdHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCdcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1JlYWN0IE5hdGl2ZSBkb2VzIG5vdCBoYXZlIGEgYnVpbHQtaW4gc2VjdXJlIHJhbmRvbSBnZW5lcmF0b3IuICcgK1xuICAgICAgICAnSWYgeW91IGRvbuKAmXQgbmVlZCB1bnByZWRpY3RhYmxlIElEcyB1c2UgYG5hbm9pZC9ub24tc2VjdXJlYC4gJyArXG4gICAgICAgICdGb3Igc2VjdXJlIElEcywgaW1wb3J0IGByZWFjdC1uYXRpdmUtZ2V0LXJhbmRvbS12YWx1ZXNgICcgK1xuICAgICAgICAnYmVmb3JlIE5hbm8gSUQuJ1xuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdJbXBvcnQgZmlsZSB3aXRoIGBpZiAoIXdpbmRvdy5jcnlwdG8pIHdpbmRvdy5jcnlwdG8gPSB3aW5kb3cubXNDcnlwdG9gJyArXG4gICAgICAgICcgYmVmb3JlIGltcG9ydGluZyBOYW5vIElEIHRvIGZpeCBJRSAxMSBzdXBwb3J0J1xuICAgIClcbiAgfVxuICBpZiAodHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnWW91ciBicm93c2VyIGRvZXMgbm90IGhhdmUgc2VjdXJlIHJhbmRvbSBnZW5lcmF0b3IuICcgK1xuICAgICAgICAnSWYgeW91IGRvbuKAmXQgbmVlZCB1bnByZWRpY3RhYmxlIElEcywgeW91IGNhbiB1c2UgbmFub2lkL25vbi1zZWN1cmUuJ1xuICAgIClcbiAgfVxufVxubGV0IHJhbmRvbSA9IGJ5dGVzID0+IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxubGV0IGN1c3RvbVJhbmRvbSA9IChhbHBoYWJldCwgc2l6ZSwgZ2V0UmFuZG9tKSA9PiB7XG4gIGxldCBtYXNrID0gKDIgPDwgKE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpKSAtIDFcbiAgbGV0IHN0ZXAgPSAtfigoMS42ICogbWFzayAqIHNpemUpIC8gYWxwaGFiZXQubGVuZ3RoKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBieXRlcyA9IGdldFJhbmRvbShzdGVwKVxuICAgICAgbGV0IGogPSBzdGVwXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIGlkICs9IGFscGhhYmV0W2J5dGVzW2pdICYgbWFza10gfHwgJydcbiAgICAgICAgaWYgKGlkLmxlbmd0aCA9PT0gc2l6ZSkgcmV0dXJuIGlkXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5sZXQgY3VzdG9tQWxwaGFiZXQgPSAoYWxwaGFiZXQsIHNpemUpID0+IGN1c3RvbVJhbmRvbShhbHBoYWJldCwgc2l6ZSwgcmFuZG9tKVxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSlcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIGxldCBieXRlID0gYnl0ZXNbc2l6ZV0gJiA2M1xuICAgIGlmIChieXRlIDwgMzYpIHtcbiAgICAgIGlkICs9IGJ5dGUudG9TdHJpbmcoMzYpXG4gICAgfSBlbHNlIGlmIChieXRlIDwgNjIpIHtcbiAgICAgIGlkICs9IChieXRlIC0gMjYpLnRvU3RyaW5nKDM2KS50b1VwcGVyQ2FzZSgpXG4gICAgfSBlbHNlIGlmIChieXRlIDwgNjMpIHtcbiAgICAgIGlkICs9ICdfJ1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCArPSAnLSdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlkXG59XG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0LCBjdXN0b21SYW5kb20sIHVybEFscGhhYmV0LCByYW5kb20gfVxuIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSmVmZiBIbHl3YSAoamhseXdhQGdtYWlsLmNvbSlcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBDaGVzcyA9IGZ1bmN0aW9uIChmZW4pIHtcbiAgdmFyIEJMQUNLID0gJ2InXG4gIHZhciBXSElURSA9ICd3J1xuXG4gIHZhciBFTVBUWSA9IC0xXG5cbiAgdmFyIFBBV04gPSAncCdcbiAgdmFyIEtOSUdIVCA9ICduJ1xuICB2YXIgQklTSE9QID0gJ2InXG4gIHZhciBST09LID0gJ3InXG4gIHZhciBRVUVFTiA9ICdxJ1xuICB2YXIgS0lORyA9ICdrJ1xuXG4gIHZhciBTWU1CT0xTID0gJ3BuYnJxa1BOQlJRSydcblxuICB2YXIgREVGQVVMVF9QT1NJVElPTiA9XG4gICAgJ3JuYnFrYm5yL3BwcHBwcHBwLzgvOC84LzgvUFBQUFBQUFAvUk5CUUtCTlIgdyBLUWtxIC0gMCAxJ1xuXG4gIHZhciBURVJNSU5BVElPTl9NQVJLRVJTID0gWycxLTAnLCAnMC0xJywgJzEvMi0xLzInLCAnKiddXG5cbiAgdmFyIFBBV05fT0ZGU0VUUyA9IHtcbiAgICBiOiBbMTYsIDMyLCAxNywgMTVdLFxuICAgIHc6IFstMTYsIC0zMiwgLTE3LCAtMTVdLFxuICB9XG5cbiAgdmFyIFBJRUNFX09GRlNFVFMgPSB7XG4gICAgbjogWy0xOCwgLTMzLCAtMzEsIC0xNCwgMTgsIDMzLCAzMSwgMTRdLFxuICAgIGI6IFstMTcsIC0xNSwgMTcsIDE1XSxcbiAgICByOiBbLTE2LCAxLCAxNiwgLTFdLFxuICAgIHE6IFstMTcsIC0xNiwgLTE1LCAxLCAxNywgMTYsIDE1LCAtMV0sXG4gICAgazogWy0xNywgLTE2LCAtMTUsIDEsIDE3LCAxNiwgMTUsIC0xXSxcbiAgfVxuXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICB2YXIgQVRUQUNLUyA9IFtcbiAgICAyMCwgMCwgMCwgMCwgMCwgMCwgMCwgMjQsICAwLCAwLCAwLCAwLCAwLCAwLDIwLCAwLFxuICAgICAwLDIwLCAwLCAwLCAwLCAwLCAwLCAyNCwgIDAsIDAsIDAsIDAsIDAsMjAsIDAsIDAsXG4gICAgIDAsIDAsMjAsIDAsIDAsIDAsIDAsIDI0LCAgMCwgMCwgMCwgMCwyMCwgMCwgMCwgMCxcbiAgICAgMCwgMCwgMCwyMCwgMCwgMCwgMCwgMjQsICAwLCAwLCAwLDIwLCAwLCAwLCAwLCAwLFxuICAgICAwLCAwLCAwLCAwLDIwLCAwLCAwLCAyNCwgIDAsIDAsMjAsIDAsIDAsIDAsIDAsIDAsXG4gICAgIDAsIDAsIDAsIDAsIDAsMjAsIDIsIDI0LCAgMiwyMCwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgICAgMCwgMCwgMCwgMCwgMCwgMiw1MywgNTYsIDUzLCAyLCAwLCAwLCAwLCAwLCAwLCAwLFxuICAgIDI0LDI0LDI0LDI0LDI0LDI0LDU2LCAgMCwgNTYsMjQsMjQsMjQsMjQsMjQsMjQsIDAsXG4gICAgIDAsIDAsIDAsIDAsIDAsIDIsNTMsIDU2LCA1MywgMiwgMCwgMCwgMCwgMCwgMCwgMCxcbiAgICAgMCwgMCwgMCwgMCwgMCwyMCwgMiwgMjQsICAyLDIwLCAwLCAwLCAwLCAwLCAwLCAwLFxuICAgICAwLCAwLCAwLCAwLDIwLCAwLCAwLCAyNCwgIDAsIDAsMjAsIDAsIDAsIDAsIDAsIDAsXG4gICAgIDAsIDAsIDAsMjAsIDAsIDAsIDAsIDI0LCAgMCwgMCwgMCwyMCwgMCwgMCwgMCwgMCxcbiAgICAgMCwgMCwyMCwgMCwgMCwgMCwgMCwgMjQsICAwLCAwLCAwLCAwLDIwLCAwLCAwLCAwLFxuICAgICAwLDIwLCAwLCAwLCAwLCAwLCAwLCAyNCwgIDAsIDAsIDAsIDAsIDAsMjAsIDAsIDAsXG4gICAgMjAsIDAsIDAsIDAsIDAsIDAsIDAsIDI0LCAgMCwgMCwgMCwgMCwgMCwgMCwyMFxuICBdO1xuXG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICB2YXIgUkFZUyA9IFtcbiAgICAgMTcsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsIDE2LCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLCAxNSwgMCxcbiAgICAgIDAsIDE3LCAgMCwgIDAsICAwLCAgMCwgIDAsIDE2LCAgMCwgIDAsICAwLCAgMCwgIDAsIDE1LCAgMCwgMCxcbiAgICAgIDAsICAwLCAxNywgIDAsICAwLCAgMCwgIDAsIDE2LCAgMCwgIDAsICAwLCAgMCwgMTUsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgMTcsICAwLCAgMCwgIDAsIDE2LCAgMCwgIDAsICAwLCAxNSwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsIDE3LCAgMCwgIDAsIDE2LCAgMCwgIDAsIDE1LCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsICAwLCAxNywgIDAsIDE2LCAgMCwgMTUsICAwLCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgMTcsIDE2LCAxNSwgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDEsICAxLCAgMSwgIDEsICAxLCAgMSwgIDEsICAwLCAtMSwgLTEsICAtMSwtMSwgLTEsIC0xLCAtMSwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwtMTUsLTE2LC0xNywgIDAsICAwLCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsICAwLC0xNSwgIDAsLTE2LCAgMCwtMTcsICAwLCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwgIDAsLTE1LCAgMCwgIDAsLTE2LCAgMCwgIDAsLTE3LCAgMCwgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLCAgMCwtMTUsICAwLCAgMCwgIDAsLTE2LCAgMCwgIDAsICAwLC0xNywgIDAsICAwLCAgMCwgMCxcbiAgICAgIDAsICAwLC0xNSwgIDAsICAwLCAgMCwgIDAsLTE2LCAgMCwgIDAsICAwLCAgMCwtMTcsICAwLCAgMCwgMCxcbiAgICAgIDAsLTE1LCAgMCwgIDAsICAwLCAgMCwgIDAsLTE2LCAgMCwgIDAsICAwLCAgMCwgIDAsLTE3LCAgMCwgMCxcbiAgICAtMTUsICAwLCAgMCwgIDAsICAwLCAgMCwgIDAsLTE2LCAgMCwgIDAsICAwLCAgMCwgIDAsICAwLC0xN1xuICBdO1xuXG4gIHZhciBTSElGVFMgPSB7IHA6IDAsIG46IDEsIGI6IDIsIHI6IDMsIHE6IDQsIGs6IDUgfVxuXG4gIHZhciBGTEFHUyA9IHtcbiAgICBOT1JNQUw6ICduJyxcbiAgICBDQVBUVVJFOiAnYycsXG4gICAgQklHX1BBV046ICdiJyxcbiAgICBFUF9DQVBUVVJFOiAnZScsXG4gICAgUFJPTU9USU9OOiAncCcsXG4gICAgS1NJREVfQ0FTVExFOiAnaycsXG4gICAgUVNJREVfQ0FTVExFOiAncScsXG4gIH1cblxuICB2YXIgQklUUyA9IHtcbiAgICBOT1JNQUw6IDEsXG4gICAgQ0FQVFVSRTogMixcbiAgICBCSUdfUEFXTjogNCxcbiAgICBFUF9DQVBUVVJFOiA4LFxuICAgIFBST01PVElPTjogMTYsXG4gICAgS1NJREVfQ0FTVExFOiAzMixcbiAgICBRU0lERV9DQVNUTEU6IDY0LFxuICB9XG5cbiAgdmFyIFJBTktfMSA9IDdcbiAgdmFyIFJBTktfMiA9IDZcbiAgdmFyIFJBTktfMyA9IDVcbiAgdmFyIFJBTktfNCA9IDRcbiAgdmFyIFJBTktfNSA9IDNcbiAgdmFyIFJBTktfNiA9IDJcbiAgdmFyIFJBTktfNyA9IDFcbiAgdmFyIFJBTktfOCA9IDBcblxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgdmFyIFNRVUFSRVMgPSB7XG4gICAgYTg6ICAgMCwgYjg6ICAgMSwgYzg6ICAgMiwgZDg6ICAgMywgZTg6ICAgNCwgZjg6ICAgNSwgZzg6ICAgNiwgaDg6ICAgNyxcbiAgICBhNzogIDE2LCBiNzogIDE3LCBjNzogIDE4LCBkNzogIDE5LCBlNzogIDIwLCBmNzogIDIxLCBnNzogIDIyLCBoNzogIDIzLFxuICAgIGE2OiAgMzIsIGI2OiAgMzMsIGM2OiAgMzQsIGQ2OiAgMzUsIGU2OiAgMzYsIGY2OiAgMzcsIGc2OiAgMzgsIGg2OiAgMzksXG4gICAgYTU6ICA0OCwgYjU6ICA0OSwgYzU6ICA1MCwgZDU6ICA1MSwgZTU6ICA1MiwgZjU6ICA1MywgZzU6ICA1NCwgaDU6ICA1NSxcbiAgICBhNDogIDY0LCBiNDogIDY1LCBjNDogIDY2LCBkNDogIDY3LCBlNDogIDY4LCBmNDogIDY5LCBnNDogIDcwLCBoNDogIDcxLFxuICAgIGEzOiAgODAsIGIzOiAgODEsIGMzOiAgODIsIGQzOiAgODMsIGUzOiAgODQsIGYzOiAgODUsIGczOiAgODYsIGgzOiAgODcsXG4gICAgYTI6ICA5NiwgYjI6ICA5NywgYzI6ICA5OCwgZDI6ICA5OSwgZTI6IDEwMCwgZjI6IDEwMSwgZzI6IDEwMiwgaDI6IDEwMyxcbiAgICBhMTogMTEyLCBiMTogMTEzLCBjMTogMTE0LCBkMTogMTE1LCBlMTogMTE2LCBmMTogMTE3LCBnMTogMTE4LCBoMTogMTE5XG4gIH07XG5cbiAgdmFyIFJPT0tTID0ge1xuICAgIHc6IFtcbiAgICAgIHsgc3F1YXJlOiBTUVVBUkVTLmExLCBmbGFnOiBCSVRTLlFTSURFX0NBU1RMRSB9LFxuICAgICAgeyBzcXVhcmU6IFNRVUFSRVMuaDEsIGZsYWc6IEJJVFMuS1NJREVfQ0FTVExFIH0sXG4gICAgXSxcbiAgICBiOiBbXG4gICAgICB7IHNxdWFyZTogU1FVQVJFUy5hOCwgZmxhZzogQklUUy5RU0lERV9DQVNUTEUgfSxcbiAgICAgIHsgc3F1YXJlOiBTUVVBUkVTLmg4LCBmbGFnOiBCSVRTLktTSURFX0NBU1RMRSB9LFxuICAgIF0sXG4gIH1cblxuICB2YXIgYm9hcmQgPSBuZXcgQXJyYXkoMTI4KVxuICB2YXIga2luZ3MgPSB7IHc6IEVNUFRZLCBiOiBFTVBUWSB9XG4gIHZhciB0dXJuID0gV0hJVEVcbiAgdmFyIGNhc3RsaW5nID0geyB3OiAwLCBiOiAwIH1cbiAgdmFyIGVwX3NxdWFyZSA9IEVNUFRZXG4gIHZhciBoYWxmX21vdmVzID0gMFxuICB2YXIgbW92ZV9udW1iZXIgPSAxXG4gIHZhciBoaXN0b3J5ID0gW11cbiAgdmFyIGhlYWRlciA9IHt9XG4gIHZhciBjb21tZW50cyA9IHt9XG5cbiAgLyogaWYgdGhlIHVzZXIgcGFzc2VzIGluIGEgZmVuIHN0cmluZywgbG9hZCBpdCwgZWxzZSBkZWZhdWx0IHRvXG4gICAqIHN0YXJ0aW5nIHBvc2l0aW9uXG4gICAqL1xuICBpZiAodHlwZW9mIGZlbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2FkKERFRkFVTFRfUE9TSVRJT04pXG4gIH0gZWxzZSB7XG4gICAgbG9hZChmZW4pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhcihrZWVwX2hlYWRlcnMpIHtcbiAgICBpZiAodHlwZW9mIGtlZXBfaGVhZGVycyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGtlZXBfaGVhZGVycyA9IGZhbHNlXG4gICAgfVxuXG4gICAgYm9hcmQgPSBuZXcgQXJyYXkoMTI4KVxuICAgIGtpbmdzID0geyB3OiBFTVBUWSwgYjogRU1QVFkgfVxuICAgIHR1cm4gPSBXSElURVxuICAgIGNhc3RsaW5nID0geyB3OiAwLCBiOiAwIH1cbiAgICBlcF9zcXVhcmUgPSBFTVBUWVxuICAgIGhhbGZfbW92ZXMgPSAwXG4gICAgbW92ZV9udW1iZXIgPSAxXG4gICAgaGlzdG9yeSA9IFtdXG4gICAgaWYgKCFrZWVwX2hlYWRlcnMpIGhlYWRlciA9IHt9XG4gICAgY29tbWVudHMgPSB7fVxuICAgIHVwZGF0ZV9zZXR1cChnZW5lcmF0ZV9mZW4oKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBydW5lX2NvbW1lbnRzKCkge1xuICAgIHZhciByZXZlcnNlZF9oaXN0b3J5ID0gW11cbiAgICB2YXIgY3VycmVudF9jb21tZW50cyA9IHt9XG4gICAgdmFyIGNvcHlfY29tbWVudCA9IGZ1bmN0aW9uIChmZW4pIHtcbiAgICAgIGlmIChmZW4gaW4gY29tbWVudHMpIHtcbiAgICAgICAgY3VycmVudF9jb21tZW50c1tmZW5dID0gY29tbWVudHNbZmVuXVxuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoaGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICByZXZlcnNlZF9oaXN0b3J5LnB1c2godW5kb19tb3ZlKCkpXG4gICAgfVxuICAgIGNvcHlfY29tbWVudChnZW5lcmF0ZV9mZW4oKSlcbiAgICB3aGlsZSAocmV2ZXJzZWRfaGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICBtYWtlX21vdmUocmV2ZXJzZWRfaGlzdG9yeS5wb3AoKSlcbiAgICAgIGNvcHlfY29tbWVudChnZW5lcmF0ZV9mZW4oKSlcbiAgICB9XG4gICAgY29tbWVudHMgPSBjdXJyZW50X2NvbW1lbnRzXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsb2FkKERFRkFVTFRfUE9TSVRJT04pXG4gIH1cblxuICBmdW5jdGlvbiBsb2FkKGZlbiwga2VlcF9oZWFkZXJzKSB7XG4gICAgaWYgKHR5cGVvZiBrZWVwX2hlYWRlcnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBrZWVwX2hlYWRlcnMgPSBmYWxzZVxuICAgIH1cblxuICAgIHZhciB0b2tlbnMgPSBmZW4uc3BsaXQoL1xccysvKVxuICAgIHZhciBwb3NpdGlvbiA9IHRva2Vuc1swXVxuICAgIHZhciBzcXVhcmUgPSAwXG5cbiAgICBpZiAoIXZhbGlkYXRlX2ZlbihmZW4pLnZhbGlkKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjbGVhcihrZWVwX2hlYWRlcnMpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc2l0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwb3NpdGlvbi5jaGFyQXQoaSlcblxuICAgICAgaWYgKHBpZWNlID09PSAnLycpIHtcbiAgICAgICAgc3F1YXJlICs9IDhcbiAgICAgIH0gZWxzZSBpZiAoaXNfZGlnaXQocGllY2UpKSB7XG4gICAgICAgIHNxdWFyZSArPSBwYXJzZUludChwaWVjZSwgMTApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29sb3IgPSBwaWVjZSA8ICdhJyA/IFdISVRFIDogQkxBQ0tcbiAgICAgICAgcHV0KHsgdHlwZTogcGllY2UudG9Mb3dlckNhc2UoKSwgY29sb3I6IGNvbG9yIH0sIGFsZ2VicmFpYyhzcXVhcmUpKVxuICAgICAgICBzcXVhcmUrK1xuICAgICAgfVxuICAgIH1cblxuICAgIHR1cm4gPSB0b2tlbnNbMV1cblxuICAgIGlmICh0b2tlbnNbMl0uaW5kZXhPZignSycpID4gLTEpIHtcbiAgICAgIGNhc3RsaW5nLncgfD0gQklUUy5LU0lERV9DQVNUTEVcbiAgICB9XG4gICAgaWYgKHRva2Vuc1syXS5pbmRleE9mKCdRJykgPiAtMSkge1xuICAgICAgY2FzdGxpbmcudyB8PSBCSVRTLlFTSURFX0NBU1RMRVxuICAgIH1cbiAgICBpZiAodG9rZW5zWzJdLmluZGV4T2YoJ2snKSA+IC0xKSB7XG4gICAgICBjYXN0bGluZy5iIHw9IEJJVFMuS1NJREVfQ0FTVExFXG4gICAgfVxuICAgIGlmICh0b2tlbnNbMl0uaW5kZXhPZigncScpID4gLTEpIHtcbiAgICAgIGNhc3RsaW5nLmIgfD0gQklUUy5RU0lERV9DQVNUTEVcbiAgICB9XG5cbiAgICBlcF9zcXVhcmUgPSB0b2tlbnNbM10gPT09ICctJyA/IEVNUFRZIDogU1FVQVJFU1t0b2tlbnNbM11dXG4gICAgaGFsZl9tb3ZlcyA9IHBhcnNlSW50KHRva2Vuc1s0XSwgMTApXG4gICAgbW92ZV9udW1iZXIgPSBwYXJzZUludCh0b2tlbnNbNV0sIDEwKVxuXG4gICAgdXBkYXRlX3NldHVwKGdlbmVyYXRlX2ZlbigpKVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qIFRPRE86IHRoaXMgZnVuY3Rpb24gaXMgcHJldHR5IG11Y2ggY3JhcCAtIGl0IHZhbGlkYXRlcyBzdHJ1Y3R1cmUgYnV0XG4gICAqIGNvbXBsZXRlbHkgaWdub3JlcyBjb250ZW50IChlLmcuIGRvZXNuJ3QgdmVyaWZ5IHRoYXQgZWFjaCBzaWRlIGhhcyBhIGtpbmcpXG4gICAqIC4uLiB3ZSBzaG91bGQgcmV3cml0ZSB0aGlzLCBhbmQgZGl0Y2ggdGhlIHNpbGx5IGVycm9yX251bWJlciBmaWVsZCB3aGlsZVxuICAgKiB3ZSdyZSBhdCBpdFxuICAgKi9cbiAgZnVuY3Rpb24gdmFsaWRhdGVfZmVuKGZlbikge1xuICAgIHZhciBlcnJvcnMgPSB7XG4gICAgICAwOiAnTm8gZXJyb3JzLicsXG4gICAgICAxOiAnRkVOIHN0cmluZyBtdXN0IGNvbnRhaW4gc2l4IHNwYWNlLWRlbGltaXRlZCBmaWVsZHMuJyxcbiAgICAgIDI6ICc2dGggZmllbGQgKG1vdmUgbnVtYmVyKSBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nLFxuICAgICAgMzogJzV0aCBmaWVsZCAoaGFsZiBtb3ZlIGNvdW50ZXIpIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlci4nLFxuICAgICAgNDogJzR0aCBmaWVsZCAoZW4tcGFzc2FudCBzcXVhcmUpIGlzIGludmFsaWQuJyxcbiAgICAgIDU6ICczcmQgZmllbGQgKGNhc3RsaW5nIGF2YWlsYWJpbGl0eSkgaXMgaW52YWxpZC4nLFxuICAgICAgNjogJzJuZCBmaWVsZCAoc2lkZSB0byBtb3ZlKSBpcyBpbnZhbGlkLicsXG4gICAgICA3OiBcIjFzdCBmaWVsZCAocGllY2UgcG9zaXRpb25zKSBkb2VzIG5vdCBjb250YWluIDggJy8nLWRlbGltaXRlZCByb3dzLlwiLFxuICAgICAgODogJzFzdCBmaWVsZCAocGllY2UgcG9zaXRpb25zKSBpcyBpbnZhbGlkIFtjb25zZWN1dGl2ZSBudW1iZXJzXS4nLFxuICAgICAgOTogJzFzdCBmaWVsZCAocGllY2UgcG9zaXRpb25zKSBpcyBpbnZhbGlkIFtpbnZhbGlkIHBpZWNlXS4nLFxuICAgICAgMTA6ICcxc3QgZmllbGQgKHBpZWNlIHBvc2l0aW9ucykgaXMgaW52YWxpZCBbcm93IHRvbyBsYXJnZV0uJyxcbiAgICAgIDExOiAnSWxsZWdhbCBlbi1wYXNzYW50IHNxdWFyZScsXG4gICAgfVxuXG4gICAgLyogMXN0IGNyaXRlcmlvbjogNiBzcGFjZS1zZXBlcmF0ZWQgZmllbGRzPyAqL1xuICAgIHZhciB0b2tlbnMgPSBmZW4uc3BsaXQoL1xccysvKVxuICAgIGlmICh0b2tlbnMubGVuZ3RoICE9PSA2KSB7XG4gICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9yX251bWJlcjogMSwgZXJyb3I6IGVycm9yc1sxXSB9XG4gICAgfVxuXG4gICAgLyogMm5kIGNyaXRlcmlvbjogbW92ZSBudW1iZXIgZmllbGQgaXMgYSBpbnRlZ2VyIHZhbHVlID4gMD8gKi9cbiAgICBpZiAoaXNOYU4odG9rZW5zWzVdKSB8fCBwYXJzZUludCh0b2tlbnNbNV0sIDEwKSA8PSAwKSB7XG4gICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9yX251bWJlcjogMiwgZXJyb3I6IGVycm9yc1syXSB9XG4gICAgfVxuXG4gICAgLyogM3JkIGNyaXRlcmlvbjogaGFsZiBtb3ZlIGNvdW50ZXIgaXMgYW4gaW50ZWdlciA+PSAwPyAqL1xuICAgIGlmIChpc05hTih0b2tlbnNbNF0pIHx8IHBhcnNlSW50KHRva2Vuc1s0XSwgMTApIDwgMCkge1xuICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBlcnJvcl9udW1iZXI6IDMsIGVycm9yOiBlcnJvcnNbM10gfVxuICAgIH1cblxuICAgIC8qIDR0aCBjcml0ZXJpb246IDR0aCBmaWVsZCBpcyBhIHZhbGlkIGUucC4tc3RyaW5nPyAqL1xuICAgIGlmICghL14oLXxbYWJjZGVmZ2hdWzM2XSkkLy50ZXN0KHRva2Vuc1szXSkpIHtcbiAgICAgIHJldHVybiB7IHZhbGlkOiBmYWxzZSwgZXJyb3JfbnVtYmVyOiA0LCBlcnJvcjogZXJyb3JzWzRdIH1cbiAgICB9XG5cbiAgICAvKiA1dGggY3JpdGVyaW9uOiAzdGggZmllbGQgaXMgYSB2YWxpZCBjYXN0bGUtc3RyaW5nPyAqL1xuICAgIGlmICghL14oS1E/az9xP3xRaz9xP3xrcT98cXwtKSQvLnRlc3QodG9rZW5zWzJdKSkge1xuICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBlcnJvcl9udW1iZXI6IDUsIGVycm9yOiBlcnJvcnNbNV0gfVxuICAgIH1cblxuICAgIC8qIDZ0aCBjcml0ZXJpb246IDJuZCBmaWVsZCBpcyBcIndcIiAod2hpdGUpIG9yIFwiYlwiIChibGFjayk/ICovXG4gICAgaWYgKCEvXih3fGIpJC8udGVzdCh0b2tlbnNbMV0pKSB7XG4gICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9yX251bWJlcjogNiwgZXJyb3I6IGVycm9yc1s2XSB9XG4gICAgfVxuXG4gICAgLyogN3RoIGNyaXRlcmlvbjogMXN0IGZpZWxkIGNvbnRhaW5zIDggcm93cz8gKi9cbiAgICB2YXIgcm93cyA9IHRva2Vuc1swXS5zcGxpdCgnLycpXG4gICAgaWYgKHJvd3MubGVuZ3RoICE9PSA4KSB7XG4gICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9yX251bWJlcjogNywgZXJyb3I6IGVycm9yc1s3XSB9XG4gICAgfVxuXG4gICAgLyogOHRoIGNyaXRlcmlvbjogZXZlcnkgcm93IGlzIHZhbGlkPyAqL1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgLyogY2hlY2sgZm9yIHJpZ2h0IHN1bSBvZiBmaWVsZHMgQU5EIG5vdCB0d28gbnVtYmVycyBpbiBzdWNjZXNzaW9uICovXG4gICAgICB2YXIgc3VtX2ZpZWxkcyA9IDBcbiAgICAgIHZhciBwcmV2aW91c193YXNfbnVtYmVyID0gZmFsc2VcblxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCByb3dzW2ldLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGlmICghaXNOYU4ocm93c1tpXVtrXSkpIHtcbiAgICAgICAgICBpZiAocHJldmlvdXNfd2FzX251bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBlcnJvcl9udW1iZXI6IDgsIGVycm9yOiBlcnJvcnNbOF0gfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdW1fZmllbGRzICs9IHBhcnNlSW50KHJvd3NbaV1ba10sIDEwKVxuICAgICAgICAgIHByZXZpb3VzX3dhc19udW1iZXIgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCEvXltwcm5icWtQUk5CUUtdJC8udGVzdChyb3dzW2ldW2tdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBlcnJvcl9udW1iZXI6IDksIGVycm9yOiBlcnJvcnNbOV0gfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdW1fZmllbGRzICs9IDFcbiAgICAgICAgICBwcmV2aW91c193YXNfbnVtYmVyID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1bV9maWVsZHMgIT09IDgpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsaWQ6IGZhbHNlLCBlcnJvcl9udW1iZXI6IDEwLCBlcnJvcjogZXJyb3JzWzEwXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgKHRva2Vuc1szXVsxXSA9PSAnMycgJiYgdG9rZW5zWzFdID09ICd3JykgfHxcbiAgICAgICh0b2tlbnNbM11bMV0gPT0gJzYnICYmIHRva2Vuc1sxXSA9PSAnYicpXG4gICAgKSB7XG4gICAgICByZXR1cm4geyB2YWxpZDogZmFsc2UsIGVycm9yX251bWJlcjogMTEsIGVycm9yOiBlcnJvcnNbMTFdIH1cbiAgICB9XG5cbiAgICAvKiBldmVyeXRoaW5nJ3Mgb2theSEgKi9cbiAgICByZXR1cm4geyB2YWxpZDogdHJ1ZSwgZXJyb3JfbnVtYmVyOiAwLCBlcnJvcjogZXJyb3JzWzBdIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlX2ZlbigpIHtcbiAgICB2YXIgZW1wdHkgPSAwXG4gICAgdmFyIGZlbiA9ICcnXG5cbiAgICBmb3IgKHZhciBpID0gU1FVQVJFUy5hODsgaSA8PSBTUVVBUkVTLmgxOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFtpXSA9PSBudWxsKSB7XG4gICAgICAgIGVtcHR5KytcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbXB0eSA+IDApIHtcbiAgICAgICAgICBmZW4gKz0gZW1wdHlcbiAgICAgICAgICBlbXB0eSA9IDBcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29sb3IgPSBib2FyZFtpXS5jb2xvclxuICAgICAgICB2YXIgcGllY2UgPSBib2FyZFtpXS50eXBlXG5cbiAgICAgICAgZmVuICs9IGNvbG9yID09PSBXSElURSA/IHBpZWNlLnRvVXBwZXJDYXNlKCkgOiBwaWVjZS50b0xvd2VyQ2FzZSgpXG4gICAgICB9XG5cbiAgICAgIGlmICgoaSArIDEpICYgMHg4OCkge1xuICAgICAgICBpZiAoZW1wdHkgPiAwKSB7XG4gICAgICAgICAgZmVuICs9IGVtcHR5XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gU1FVQVJFUy5oMSkge1xuICAgICAgICAgIGZlbiArPSAnLydcbiAgICAgICAgfVxuXG4gICAgICAgIGVtcHR5ID0gMFxuICAgICAgICBpICs9IDhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2ZsYWdzID0gJydcbiAgICBpZiAoY2FzdGxpbmdbV0hJVEVdICYgQklUUy5LU0lERV9DQVNUTEUpIHtcbiAgICAgIGNmbGFncyArPSAnSydcbiAgICB9XG4gICAgaWYgKGNhc3RsaW5nW1dISVRFXSAmIEJJVFMuUVNJREVfQ0FTVExFKSB7XG4gICAgICBjZmxhZ3MgKz0gJ1EnXG4gICAgfVxuICAgIGlmIChjYXN0bGluZ1tCTEFDS10gJiBCSVRTLktTSURFX0NBU1RMRSkge1xuICAgICAgY2ZsYWdzICs9ICdrJ1xuICAgIH1cbiAgICBpZiAoY2FzdGxpbmdbQkxBQ0tdICYgQklUUy5RU0lERV9DQVNUTEUpIHtcbiAgICAgIGNmbGFncyArPSAncSdcbiAgICB9XG5cbiAgICAvKiBkbyB3ZSBoYXZlIGFuIGVtcHR5IGNhc3RsaW5nIGZsYWc/ICovXG4gICAgY2ZsYWdzID0gY2ZsYWdzIHx8ICctJ1xuICAgIHZhciBlcGZsYWdzID0gZXBfc3F1YXJlID09PSBFTVBUWSA/ICctJyA6IGFsZ2VicmFpYyhlcF9zcXVhcmUpXG5cbiAgICByZXR1cm4gW2ZlbiwgdHVybiwgY2ZsYWdzLCBlcGZsYWdzLCBoYWxmX21vdmVzLCBtb3ZlX251bWJlcl0uam9pbignICcpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRfaGVhZGVyKGFyZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1tpXSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGFyZ3NbaSArIDFdID09PSAnc3RyaW5nJykge1xuICAgICAgICBoZWFkZXJbYXJnc1tpXV0gPSBhcmdzW2kgKyAxXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGVhZGVyXG4gIH1cblxuICAvKiBjYWxsZWQgd2hlbiB0aGUgaW5pdGlhbCBib2FyZCBzZXR1cCBpcyBjaGFuZ2VkIHdpdGggcHV0KCkgb3IgcmVtb3ZlKCkuXG4gICAqIG1vZGlmaWVzIHRoZSBTZXRVcCBhbmQgRkVOIHByb3BlcnRpZXMgb2YgdGhlIGhlYWRlciBvYmplY3QuICBpZiB0aGUgRkVOIGlzXG4gICAqIGVxdWFsIHRvIHRoZSBkZWZhdWx0IHBvc2l0aW9uLCB0aGUgU2V0VXAgYW5kIEZFTiBhcmUgZGVsZXRlZFxuICAgKiB0aGUgc2V0dXAgaXMgb25seSB1cGRhdGVkIGlmIGhpc3RvcnkubGVuZ3RoIGlzIHplcm8sIGllIG1vdmVzIGhhdmVuJ3QgYmVlblxuICAgKiBtYWRlLlxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlX3NldHVwKGZlbikge1xuICAgIGlmIChoaXN0b3J5Lmxlbmd0aCA+IDApIHJldHVyblxuXG4gICAgaWYgKGZlbiAhPT0gREVGQVVMVF9QT1NJVElPTikge1xuICAgICAgaGVhZGVyWydTZXRVcCddID0gJzEnXG4gICAgICBoZWFkZXJbJ0ZFTiddID0gZmVuXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBoZWFkZXJbJ1NldFVwJ11cbiAgICAgIGRlbGV0ZSBoZWFkZXJbJ0ZFTiddXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KHNxdWFyZSkge1xuICAgIHZhciBwaWVjZSA9IGJvYXJkW1NRVUFSRVNbc3F1YXJlXV1cbiAgICByZXR1cm4gcGllY2UgPyB7IHR5cGU6IHBpZWNlLnR5cGUsIGNvbG9yOiBwaWVjZS5jb2xvciB9IDogbnVsbFxuICB9XG5cbiAgZnVuY3Rpb24gcHV0KHBpZWNlLCBzcXVhcmUpIHtcbiAgICAvKiBjaGVjayBmb3IgdmFsaWQgcGllY2Ugb2JqZWN0ICovXG4gICAgaWYgKCEoJ3R5cGUnIGluIHBpZWNlICYmICdjb2xvcicgaW4gcGllY2UpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvKiBjaGVjayBmb3IgcGllY2UgKi9cbiAgICBpZiAoU1lNQk9MUy5pbmRleE9mKHBpZWNlLnR5cGUudG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvKiBjaGVjayBmb3IgdmFsaWQgc3F1YXJlICovXG4gICAgaWYgKCEoc3F1YXJlIGluIFNRVUFSRVMpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgc3EgPSBTUVVBUkVTW3NxdWFyZV1cblxuICAgIC8qIGRvbid0IGxldCB0aGUgdXNlciBwbGFjZSBtb3JlIHRoYW4gb25lIGtpbmcgKi9cbiAgICBpZiAoXG4gICAgICBwaWVjZS50eXBlID09IEtJTkcgJiZcbiAgICAgICEoa2luZ3NbcGllY2UuY29sb3JdID09IEVNUFRZIHx8IGtpbmdzW3BpZWNlLmNvbG9yXSA9PSBzcSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGJvYXJkW3NxXSA9IHsgdHlwZTogcGllY2UudHlwZSwgY29sb3I6IHBpZWNlLmNvbG9yIH1cbiAgICBpZiAocGllY2UudHlwZSA9PT0gS0lORykge1xuICAgICAga2luZ3NbcGllY2UuY29sb3JdID0gc3FcbiAgICB9XG5cbiAgICB1cGRhdGVfc2V0dXAoZ2VuZXJhdGVfZmVuKCkpXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlKHNxdWFyZSkge1xuICAgIHZhciBwaWVjZSA9IGdldChzcXVhcmUpXG4gICAgYm9hcmRbU1FVQVJFU1tzcXVhcmVdXSA9IG51bGxcbiAgICBpZiAocGllY2UgJiYgcGllY2UudHlwZSA9PT0gS0lORykge1xuICAgICAga2luZ3NbcGllY2UuY29sb3JdID0gRU1QVFlcbiAgICB9XG5cbiAgICB1cGRhdGVfc2V0dXAoZ2VuZXJhdGVfZmVuKCkpXG5cbiAgICByZXR1cm4gcGllY2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkX21vdmUoYm9hcmQsIGZyb20sIHRvLCBmbGFncywgcHJvbW90aW9uKSB7XG4gICAgdmFyIG1vdmUgPSB7XG4gICAgICBjb2xvcjogdHVybixcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBmbGFnczogZmxhZ3MsXG4gICAgICBwaWVjZTogYm9hcmRbZnJvbV0udHlwZSxcbiAgICB9XG5cbiAgICBpZiAocHJvbW90aW9uKSB7XG4gICAgICBtb3ZlLmZsYWdzIHw9IEJJVFMuUFJPTU9USU9OXG4gICAgICBtb3ZlLnByb21vdGlvbiA9IHByb21vdGlvblxuICAgIH1cblxuICAgIGlmIChib2FyZFt0b10pIHtcbiAgICAgIG1vdmUuY2FwdHVyZWQgPSBib2FyZFt0b10udHlwZVxuICAgIH0gZWxzZSBpZiAoZmxhZ3MgJiBCSVRTLkVQX0NBUFRVUkUpIHtcbiAgICAgIG1vdmUuY2FwdHVyZWQgPSBQQVdOXG4gICAgfVxuICAgIHJldHVybiBtb3ZlXG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZV9tb3ZlcyhvcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gYWRkX21vdmUoYm9hcmQsIG1vdmVzLCBmcm9tLCB0bywgZmxhZ3MpIHtcbiAgICAgIC8qIGlmIHBhd24gcHJvbW90aW9uICovXG4gICAgICBpZiAoXG4gICAgICAgIGJvYXJkW2Zyb21dLnR5cGUgPT09IFBBV04gJiZcbiAgICAgICAgKHJhbmsodG8pID09PSBSQU5LXzggfHwgcmFuayh0bykgPT09IFJBTktfMSlcbiAgICAgICkge1xuICAgICAgICB2YXIgcGllY2VzID0gW1FVRUVOLCBST09LLCBCSVNIT1AsIEtOSUdIVF1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBpZWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIG1vdmVzLnB1c2goYnVpbGRfbW92ZShib2FyZCwgZnJvbSwgdG8sIGZsYWdzLCBwaWVjZXNbaV0pKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3Zlcy5wdXNoKGJ1aWxkX21vdmUoYm9hcmQsIGZyb20sIHRvLCBmbGFncykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG1vdmVzID0gW11cbiAgICB2YXIgdXMgPSB0dXJuXG4gICAgdmFyIHRoZW0gPSBzd2FwX2NvbG9yKHVzKVxuICAgIHZhciBzZWNvbmRfcmFuayA9IHsgYjogUkFOS183LCB3OiBSQU5LXzIgfVxuXG4gICAgdmFyIGZpcnN0X3NxID0gU1FVQVJFUy5hOFxuICAgIHZhciBsYXN0X3NxID0gU1FVQVJFUy5oMVxuICAgIHZhciBzaW5nbGVfc3F1YXJlID0gZmFsc2VcblxuICAgIC8qIGRvIHdlIHdhbnQgbGVnYWwgbW92ZXM/ICovXG4gICAgdmFyIGxlZ2FsID1cbiAgICAgIHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyAmJiAnbGVnYWwnIGluIG9wdGlvbnNcbiAgICAgICAgPyBvcHRpb25zLmxlZ2FsXG4gICAgICAgIDogdHJ1ZVxuXG4gICAgdmFyIHBpZWNlX3R5cGUgPVxuICAgICAgdHlwZW9mIG9wdGlvbnMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAncGllY2UnIGluIG9wdGlvbnMgJiZcbiAgICAgIHR5cGVvZiBvcHRpb25zLnBpZWNlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IG9wdGlvbnMucGllY2UudG9Mb3dlckNhc2UoKVxuICAgICAgICA6IHRydWVcblxuICAgIC8qIGFyZSB3ZSBnZW5lcmF0aW5nIG1vdmVzIGZvciBhIHNpbmdsZSBzcXVhcmU/ICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyAmJiAnc3F1YXJlJyBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5zcXVhcmUgaW4gU1FVQVJFUykge1xuICAgICAgICBmaXJzdF9zcSA9IGxhc3Rfc3EgPSBTUVVBUkVTW29wdGlvbnMuc3F1YXJlXVxuICAgICAgICBzaW5nbGVfc3F1YXJlID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogaW52YWxpZCBzcXVhcmUgKi9cbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IGZpcnN0X3NxOyBpIDw9IGxhc3Rfc3E7IGkrKykge1xuICAgICAgLyogZGlkIHdlIHJ1biBvZmYgdGhlIGVuZCBvZiB0aGUgYm9hcmQgKi9cbiAgICAgIGlmIChpICYgMHg4OCkge1xuICAgICAgICBpICs9IDdcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgdmFyIHBpZWNlID0gYm9hcmRbaV1cbiAgICAgIGlmIChwaWVjZSA9PSBudWxsIHx8IHBpZWNlLmNvbG9yICE9PSB1cykge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAocGllY2UudHlwZSA9PT0gUEFXTiAmJiAocGllY2VfdHlwZSA9PT0gdHJ1ZSB8fCBwaWVjZV90eXBlID09PSBQQVdOKSkge1xuICAgICAgICAvKiBzaW5nbGUgc3F1YXJlLCBub24tY2FwdHVyaW5nICovXG4gICAgICAgIHZhciBzcXVhcmUgPSBpICsgUEFXTl9PRkZTRVRTW3VzXVswXVxuICAgICAgICBpZiAoYm9hcmRbc3F1YXJlXSA9PSBudWxsKSB7XG4gICAgICAgICAgYWRkX21vdmUoYm9hcmQsIG1vdmVzLCBpLCBzcXVhcmUsIEJJVFMuTk9STUFMKVxuXG4gICAgICAgICAgLyogZG91YmxlIHNxdWFyZSAqL1xuICAgICAgICAgIHZhciBzcXVhcmUgPSBpICsgUEFXTl9PRkZTRVRTW3VzXVsxXVxuICAgICAgICAgIGlmIChzZWNvbmRfcmFua1t1c10gPT09IHJhbmsoaSkgJiYgYm9hcmRbc3F1YXJlXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBhZGRfbW92ZShib2FyZCwgbW92ZXMsIGksIHNxdWFyZSwgQklUUy5CSUdfUEFXTilcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBwYXduIGNhcHR1cmVzICovXG4gICAgICAgIGZvciAoaiA9IDI7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICB2YXIgc3F1YXJlID0gaSArIFBBV05fT0ZGU0VUU1t1c11bal1cbiAgICAgICAgICBpZiAoc3F1YXJlICYgMHg4OCkgY29udGludWVcblxuICAgICAgICAgIGlmIChib2FyZFtzcXVhcmVdICE9IG51bGwgJiYgYm9hcmRbc3F1YXJlXS5jb2xvciA9PT0gdGhlbSkge1xuICAgICAgICAgICAgYWRkX21vdmUoYm9hcmQsIG1vdmVzLCBpLCBzcXVhcmUsIEJJVFMuQ0FQVFVSRSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHNxdWFyZSA9PT0gZXBfc3F1YXJlKSB7XG4gICAgICAgICAgICBhZGRfbW92ZShib2FyZCwgbW92ZXMsIGksIGVwX3NxdWFyZSwgQklUUy5FUF9DQVBUVVJFKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwaWVjZV90eXBlID09PSB0cnVlIHx8IHBpZWNlX3R5cGUgPT09IHBpZWNlLnR5cGUpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IFBJRUNFX09GRlNFVFNbcGllY2UudHlwZV0ubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gUElFQ0VfT0ZGU0VUU1twaWVjZS50eXBlXVtqXVxuICAgICAgICAgIHZhciBzcXVhcmUgPSBpXG5cbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgc3F1YXJlICs9IG9mZnNldFxuICAgICAgICAgICAgaWYgKHNxdWFyZSAmIDB4ODgpIGJyZWFrXG5cbiAgICAgICAgICAgIGlmIChib2FyZFtzcXVhcmVdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgYWRkX21vdmUoYm9hcmQsIG1vdmVzLCBpLCBzcXVhcmUsIEJJVFMuTk9STUFMKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGJvYXJkW3NxdWFyZV0uY29sb3IgPT09IHVzKSBicmVha1xuICAgICAgICAgICAgICBhZGRfbW92ZShib2FyZCwgbW92ZXMsIGksIHNxdWFyZSwgQklUUy5DQVBUVVJFKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBicmVhaywgaWYga25pZ2h0IG9yIGtpbmcgKi9cbiAgICAgICAgICAgIGlmIChwaWVjZS50eXBlID09PSAnbicgfHwgcGllY2UudHlwZSA9PT0gJ2snKSBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qIGNoZWNrIGZvciBjYXN0bGluZyBpZjogYSkgd2UncmUgZ2VuZXJhdGluZyBhbGwgbW92ZXMsIG9yIGIpIHdlJ3JlIGRvaW5nXG4gICAgICogc2luZ2xlIHNxdWFyZSBtb3ZlIGdlbmVyYXRpb24gb24gdGhlIGtpbmcncyBzcXVhcmVcbiAgICAgKi9cbiAgICBpZiAocGllY2VfdHlwZSA9PT0gdHJ1ZSB8fCBwaWVjZV90eXBlID09PSBLSU5HKSB7XG4gICAgICBpZiAoIXNpbmdsZV9zcXVhcmUgfHwgbGFzdF9zcSA9PT0ga2luZ3NbdXNdKSB7XG4gICAgICAgIC8qIGtpbmctc2lkZSBjYXN0bGluZyAqL1xuICAgICAgICBpZiAoY2FzdGxpbmdbdXNdICYgQklUUy5LU0lERV9DQVNUTEUpIHtcbiAgICAgICAgICB2YXIgY2FzdGxpbmdfZnJvbSA9IGtpbmdzW3VzXVxuICAgICAgICAgIHZhciBjYXN0bGluZ190byA9IGNhc3RsaW5nX2Zyb20gKyAyXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2FyZFtjYXN0bGluZ19mcm9tICsgMV0gPT0gbnVsbCAmJlxuICAgICAgICAgICAgYm9hcmRbY2FzdGxpbmdfdG9dID09IG51bGwgJiZcbiAgICAgICAgICAgICFhdHRhY2tlZCh0aGVtLCBraW5nc1t1c10pICYmXG4gICAgICAgICAgICAhYXR0YWNrZWQodGhlbSwgY2FzdGxpbmdfZnJvbSArIDEpICYmXG4gICAgICAgICAgICAhYXR0YWNrZWQodGhlbSwgY2FzdGxpbmdfdG8pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhZGRfbW92ZShib2FyZCwgbW92ZXMsIGtpbmdzW3VzXSwgY2FzdGxpbmdfdG8sIEJJVFMuS1NJREVfQ0FTVExFKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIHF1ZWVuLXNpZGUgY2FzdGxpbmcgKi9cbiAgICAgICAgaWYgKGNhc3RsaW5nW3VzXSAmIEJJVFMuUVNJREVfQ0FTVExFKSB7XG4gICAgICAgICAgdmFyIGNhc3RsaW5nX2Zyb20gPSBraW5nc1t1c11cbiAgICAgICAgICB2YXIgY2FzdGxpbmdfdG8gPSBjYXN0bGluZ19mcm9tIC0gMlxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYm9hcmRbY2FzdGxpbmdfZnJvbSAtIDFdID09IG51bGwgJiZcbiAgICAgICAgICAgIGJvYXJkW2Nhc3RsaW5nX2Zyb20gLSAyXSA9PSBudWxsICYmXG4gICAgICAgICAgICBib2FyZFtjYXN0bGluZ19mcm9tIC0gM10gPT0gbnVsbCAmJlxuICAgICAgICAgICAgIWF0dGFja2VkKHRoZW0sIGtpbmdzW3VzXSkgJiZcbiAgICAgICAgICAgICFhdHRhY2tlZCh0aGVtLCBjYXN0bGluZ19mcm9tIC0gMSkgJiZcbiAgICAgICAgICAgICFhdHRhY2tlZCh0aGVtLCBjYXN0bGluZ190bylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFkZF9tb3ZlKGJvYXJkLCBtb3Zlcywga2luZ3NbdXNdLCBjYXN0bGluZ190bywgQklUUy5RU0lERV9DQVNUTEUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogcmV0dXJuIGFsbCBwc2V1ZG8tbGVnYWwgbW92ZXMgKHRoaXMgaW5jbHVkZXMgbW92ZXMgdGhhdCBhbGxvdyB0aGUga2luZ1xuICAgICAqIHRvIGJlIGNhcHR1cmVkKVxuICAgICAqL1xuICAgIGlmICghbGVnYWwpIHtcbiAgICAgIHJldHVybiBtb3Zlc1xuICAgIH1cblxuICAgIC8qIGZpbHRlciBvdXQgaWxsZWdhbCBtb3ZlcyAqL1xuICAgIHZhciBsZWdhbF9tb3ZlcyA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1vdmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBtYWtlX21vdmUobW92ZXNbaV0pXG4gICAgICBpZiAoIWtpbmdfYXR0YWNrZWQodXMpKSB7XG4gICAgICAgIGxlZ2FsX21vdmVzLnB1c2gobW92ZXNbaV0pXG4gICAgICB9XG4gICAgICB1bmRvX21vdmUoKVxuICAgIH1cblxuICAgIHJldHVybiBsZWdhbF9tb3Zlc1xuICB9XG5cbiAgLyogY29udmVydCBhIG1vdmUgZnJvbSAweDg4IGNvb3JkaW5hdGVzIHRvIFN0YW5kYXJkIEFsZ2VicmFpYyBOb3RhdGlvblxuICAgKiAoU0FOKVxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNsb3BweSBVc2UgdGhlIHNsb3BweSBTQU4gZ2VuZXJhdG9yIHRvIHdvcmsgYXJvdW5kIG92ZXJcbiAgICogZGlzYW1iaWd1YXRpb24gYnVncyBpbiBGcml0eiBhbmQgQ2hlc3NiYXNlLiAgU2VlIGJlbG93OlxuICAgKlxuICAgKiByMWJxa2Juci9wcHAycHBwLzJuNS8xQjFwUDMvNFAzLzgvUFBQUDJQUC9STkJRSzFOUiBiIEtRa3EgLSAyIDRcbiAgICogNC4gLi4uIE5nZTcgaXMgb3Zlcmx5IGRpc2FtYmlndWF0ZWQgYmVjYXVzZSB0aGUga25pZ2h0IG9uIGM2IGlzIHBpbm5lZFxuICAgKiA0LiAuLi4gTmU3IGlzIHRlY2huaWNhbGx5IHRoZSB2YWxpZCBTQU5cbiAgICovXG4gIGZ1bmN0aW9uIG1vdmVfdG9fc2FuKG1vdmUsIG1vdmVzKSB7XG4gICAgdmFyIG91dHB1dCA9ICcnXG5cbiAgICBpZiAobW92ZS5mbGFncyAmIEJJVFMuS1NJREVfQ0FTVExFKSB7XG4gICAgICBvdXRwdXQgPSAnTy1PJ1xuICAgIH0gZWxzZSBpZiAobW92ZS5mbGFncyAmIEJJVFMuUVNJREVfQ0FTVExFKSB7XG4gICAgICBvdXRwdXQgPSAnTy1PLU8nXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb3ZlLnBpZWNlICE9PSBQQVdOKSB7XG4gICAgICAgIHZhciBkaXNhbWJpZ3VhdG9yID0gZ2V0X2Rpc2FtYmlndWF0b3IobW92ZSwgbW92ZXMpXG4gICAgICAgIG91dHB1dCArPSBtb3ZlLnBpZWNlLnRvVXBwZXJDYXNlKCkgKyBkaXNhbWJpZ3VhdG9yXG4gICAgICB9XG5cbiAgICAgIGlmIChtb3ZlLmZsYWdzICYgKEJJVFMuQ0FQVFVSRSB8IEJJVFMuRVBfQ0FQVFVSRSkpIHtcbiAgICAgICAgaWYgKG1vdmUucGllY2UgPT09IFBBV04pIHtcbiAgICAgICAgICBvdXRwdXQgKz0gYWxnZWJyYWljKG1vdmUuZnJvbSlbMF1cbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgKz0gJ3gnXG4gICAgICB9XG5cbiAgICAgIG91dHB1dCArPSBhbGdlYnJhaWMobW92ZS50bylcblxuICAgICAgaWYgKG1vdmUuZmxhZ3MgJiBCSVRTLlBST01PVElPTikge1xuICAgICAgICBvdXRwdXQgKz0gJz0nICsgbW92ZS5wcm9tb3Rpb24udG9VcHBlckNhc2UoKVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ha2VfbW92ZShtb3ZlKVxuICAgIGlmIChpbl9jaGVjaygpKSB7XG4gICAgICBpZiAoaW5fY2hlY2ttYXRlKCkpIHtcbiAgICAgICAgb3V0cHV0ICs9ICcjJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ICs9ICcrJ1xuICAgICAgfVxuICAgIH1cbiAgICB1bmRvX21vdmUoKVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG4gIC8vIHBhcnNlcyBhbGwgb2YgdGhlIGRlY29yYXRvcnMgb3V0IG9mIGEgU0FOIHN0cmluZ1xuICBmdW5jdGlvbiBzdHJpcHBlZF9zYW4obW92ZSkge1xuICAgIHJldHVybiBtb3ZlLnJlcGxhY2UoLz0vLCAnJykucmVwbGFjZSgvWysjXT9bPyFdKiQvLCAnJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGF0dGFja2VkKGNvbG9yLCBzcXVhcmUpIHtcbiAgICBmb3IgKHZhciBpID0gU1FVQVJFUy5hODsgaSA8PSBTUVVBUkVTLmgxOyBpKyspIHtcbiAgICAgIC8qIGRpZCB3ZSBydW4gb2ZmIHRoZSBlbmQgb2YgdGhlIGJvYXJkICovXG4gICAgICBpZiAoaSAmIDB4ODgpIHtcbiAgICAgICAgaSArPSA3XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8qIGlmIGVtcHR5IHNxdWFyZSBvciB3cm9uZyBjb2xvciAqL1xuICAgICAgaWYgKGJvYXJkW2ldID09IG51bGwgfHwgYm9hcmRbaV0uY29sb3IgIT09IGNvbG9yKSBjb250aW51ZVxuXG4gICAgICB2YXIgcGllY2UgPSBib2FyZFtpXVxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBpIC0gc3F1YXJlXG4gICAgICB2YXIgaW5kZXggPSBkaWZmZXJlbmNlICsgMTE5XG5cbiAgICAgIGlmIChBVFRBQ0tTW2luZGV4XSAmICgxIDw8IFNISUZUU1twaWVjZS50eXBlXSkpIHtcbiAgICAgICAgaWYgKHBpZWNlLnR5cGUgPT09IFBBV04pIHtcbiAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcbiAgICAgICAgICAgIGlmIChwaWVjZS5jb2xvciA9PT0gV0hJVEUpIHJldHVybiB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwaWVjZS5jb2xvciA9PT0gQkxBQ0spIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvKiBpZiB0aGUgcGllY2UgaXMgYSBrbmlnaHQgb3IgYSBraW5nICovXG4gICAgICAgIGlmIChwaWVjZS50eXBlID09PSAnbicgfHwgcGllY2UudHlwZSA9PT0gJ2snKSByZXR1cm4gdHJ1ZVxuXG4gICAgICAgIHZhciBvZmZzZXQgPSBSQVlTW2luZGV4XVxuICAgICAgICB2YXIgaiA9IGkgKyBvZmZzZXRcblxuICAgICAgICB2YXIgYmxvY2tlZCA9IGZhbHNlXG4gICAgICAgIHdoaWxlIChqICE9PSBzcXVhcmUpIHtcbiAgICAgICAgICBpZiAoYm9hcmRbal0gIT0gbnVsbCkge1xuICAgICAgICAgICAgYmxvY2tlZCA9IHRydWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIGogKz0gb2Zmc2V0XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJsb2NrZWQpIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBraW5nX2F0dGFja2VkKGNvbG9yKSB7XG4gICAgcmV0dXJuIGF0dGFja2VkKHN3YXBfY29sb3IoY29sb3IpLCBraW5nc1tjb2xvcl0pXG4gIH1cblxuICBmdW5jdGlvbiBpbl9jaGVjaygpIHtcbiAgICByZXR1cm4ga2luZ19hdHRhY2tlZCh0dXJuKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5fY2hlY2ttYXRlKCkge1xuICAgIHJldHVybiBpbl9jaGVjaygpICYmIGdlbmVyYXRlX21vdmVzKCkubGVuZ3RoID09PSAwXG4gIH1cblxuICBmdW5jdGlvbiBpbl9zdGFsZW1hdGUoKSB7XG4gICAgcmV0dXJuICFpbl9jaGVjaygpICYmIGdlbmVyYXRlX21vdmVzKCkubGVuZ3RoID09PSAwXG4gIH1cblxuICBmdW5jdGlvbiBpbnN1ZmZpY2llbnRfbWF0ZXJpYWwoKSB7XG4gICAgdmFyIHBpZWNlcyA9IHt9XG4gICAgdmFyIGJpc2hvcHMgPSBbXVxuICAgIHZhciBudW1fcGllY2VzID0gMFxuICAgIHZhciBzcV9jb2xvciA9IDBcblxuICAgIGZvciAodmFyIGkgPSBTUVVBUkVTLmE4OyBpIDw9IFNRVUFSRVMuaDE7IGkrKykge1xuICAgICAgc3FfY29sb3IgPSAoc3FfY29sb3IgKyAxKSAlIDJcbiAgICAgIGlmIChpICYgMHg4OCkge1xuICAgICAgICBpICs9IDdcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgdmFyIHBpZWNlID0gYm9hcmRbaV1cbiAgICAgIGlmIChwaWVjZSkge1xuICAgICAgICBwaWVjZXNbcGllY2UudHlwZV0gPSBwaWVjZS50eXBlIGluIHBpZWNlcyA/IHBpZWNlc1twaWVjZS50eXBlXSArIDEgOiAxXG4gICAgICAgIGlmIChwaWVjZS50eXBlID09PSBCSVNIT1ApIHtcbiAgICAgICAgICBiaXNob3BzLnB1c2goc3FfY29sb3IpXG4gICAgICAgIH1cbiAgICAgICAgbnVtX3BpZWNlcysrXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogayB2cy4gayAqL1xuICAgIGlmIChudW1fcGllY2VzID09PSAyKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAvKiBrIHZzLiBrbiAuLi4uIG9yIC4uLi4gayB2cy4ga2IgKi9cbiAgICAgIG51bV9waWVjZXMgPT09IDMgJiZcbiAgICAgIChwaWVjZXNbQklTSE9QXSA9PT0gMSB8fCBwaWVjZXNbS05JR0hUXSA9PT0gMSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChudW1fcGllY2VzID09PSBwaWVjZXNbQklTSE9QXSArIDIpIHtcbiAgICAgIC8qIGtiIHZzLiBrYiB3aGVyZSBhbnkgbnVtYmVyIG9mIGJpc2hvcHMgYXJlIGFsbCBvbiB0aGUgc2FtZSBjb2xvciAqL1xuICAgICAgdmFyIHN1bSA9IDBcbiAgICAgIHZhciBsZW4gPSBiaXNob3BzLmxlbmd0aFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBzdW0gKz0gYmlzaG9wc1tpXVxuICAgICAgfVxuICAgICAgaWYgKHN1bSA9PT0gMCB8fCBzdW0gPT09IGxlbikge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gaW5fdGhyZWVmb2xkX3JlcGV0aXRpb24oKSB7XG4gICAgLyogVE9ETzogd2hpbGUgdGhpcyBmdW5jdGlvbiBpcyBmaW5lIGZvciBjYXN1YWwgdXNlLCBhIGJldHRlclxuICAgICAqIGltcGxlbWVudGF0aW9uIHdvdWxkIHVzZSBhIFpvYnJpc3Qga2V5IChpbnN0ZWFkIG9mIEZFTikuIHRoZVxuICAgICAqIFpvYnJpc3Qga2V5IHdvdWxkIGJlIG1haW50YWluZWQgaW4gdGhlIG1ha2VfbW92ZS91bmRvX21vdmUgZnVuY3Rpb25zLFxuICAgICAqIGF2b2lkaW5nIHRoZSBjb3N0bHkgdGhhdCB3ZSBkbyBiZWxvdy5cbiAgICAgKi9cbiAgICB2YXIgbW92ZXMgPSBbXVxuICAgIHZhciBwb3NpdGlvbnMgPSB7fVxuICAgIHZhciByZXBldGl0aW9uID0gZmFsc2VcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgbW92ZSA9IHVuZG9fbW92ZSgpXG4gICAgICBpZiAoIW1vdmUpIGJyZWFrXG4gICAgICBtb3Zlcy5wdXNoKG1vdmUpXG4gICAgfVxuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIC8qIHJlbW92ZSB0aGUgbGFzdCB0d28gZmllbGRzIGluIHRoZSBGRU4gc3RyaW5nLCB0aGV5J3JlIG5vdCBuZWVkZWRcbiAgICAgICAqIHdoZW4gY2hlY2tpbmcgZm9yIGRyYXcgYnkgcmVwICovXG4gICAgICB2YXIgZmVuID0gZ2VuZXJhdGVfZmVuKCkuc3BsaXQoJyAnKS5zbGljZSgwLCA0KS5qb2luKCcgJylcblxuICAgICAgLyogaGFzIHRoZSBwb3NpdGlvbiBvY2N1cnJlZCB0aHJlZSBvciBtb3ZlIHRpbWVzICovXG4gICAgICBwb3NpdGlvbnNbZmVuXSA9IGZlbiBpbiBwb3NpdGlvbnMgPyBwb3NpdGlvbnNbZmVuXSArIDEgOiAxXG4gICAgICBpZiAocG9zaXRpb25zW2Zlbl0gPj0gMykge1xuICAgICAgICByZXBldGl0aW9uID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdmVzLmxlbmd0aCkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgbWFrZV9tb3ZlKG1vdmVzLnBvcCgpKVxuICAgIH1cblxuICAgIHJldHVybiByZXBldGl0aW9uXG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKG1vdmUpIHtcbiAgICBoaXN0b3J5LnB1c2goe1xuICAgICAgbW92ZTogbW92ZSxcbiAgICAgIGtpbmdzOiB7IGI6IGtpbmdzLmIsIHc6IGtpbmdzLncgfSxcbiAgICAgIHR1cm46IHR1cm4sXG4gICAgICBjYXN0bGluZzogeyBiOiBjYXN0bGluZy5iLCB3OiBjYXN0bGluZy53IH0sXG4gICAgICBlcF9zcXVhcmU6IGVwX3NxdWFyZSxcbiAgICAgIGhhbGZfbW92ZXM6IGhhbGZfbW92ZXMsXG4gICAgICBtb3ZlX251bWJlcjogbW92ZV9udW1iZXIsXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VfbW92ZShtb3ZlKSB7XG4gICAgdmFyIHVzID0gdHVyblxuICAgIHZhciB0aGVtID0gc3dhcF9jb2xvcih1cylcbiAgICBwdXNoKG1vdmUpXG5cbiAgICBib2FyZFttb3ZlLnRvXSA9IGJvYXJkW21vdmUuZnJvbV1cbiAgICBib2FyZFttb3ZlLmZyb21dID0gbnVsbFxuXG4gICAgLyogaWYgZXAgY2FwdHVyZSwgcmVtb3ZlIHRoZSBjYXB0dXJlZCBwYXduICovXG4gICAgaWYgKG1vdmUuZmxhZ3MgJiBCSVRTLkVQX0NBUFRVUkUpIHtcbiAgICAgIGlmICh0dXJuID09PSBCTEFDSykge1xuICAgICAgICBib2FyZFttb3ZlLnRvIC0gMTZdID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmRbbW92ZS50byArIDE2XSA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpZiBwYXduIHByb21vdGlvbiwgcmVwbGFjZSB3aXRoIG5ldyBwaWVjZSAqL1xuICAgIGlmIChtb3ZlLmZsYWdzICYgQklUUy5QUk9NT1RJT04pIHtcbiAgICAgIGJvYXJkW21vdmUudG9dID0geyB0eXBlOiBtb3ZlLnByb21vdGlvbiwgY29sb3I6IHVzIH1cbiAgICB9XG5cbiAgICAvKiBpZiB3ZSBtb3ZlZCB0aGUga2luZyAqL1xuICAgIGlmIChib2FyZFttb3ZlLnRvXS50eXBlID09PSBLSU5HKSB7XG4gICAgICBraW5nc1tib2FyZFttb3ZlLnRvXS5jb2xvcl0gPSBtb3ZlLnRvXG5cbiAgICAgIC8qIGlmIHdlIGNhc3RsZWQsIG1vdmUgdGhlIHJvb2sgbmV4dCB0byB0aGUga2luZyAqL1xuICAgICAgaWYgKG1vdmUuZmxhZ3MgJiBCSVRTLktTSURFX0NBU1RMRSkge1xuICAgICAgICB2YXIgY2FzdGxpbmdfdG8gPSBtb3ZlLnRvIC0gMVxuICAgICAgICB2YXIgY2FzdGxpbmdfZnJvbSA9IG1vdmUudG8gKyAxXG4gICAgICAgIGJvYXJkW2Nhc3RsaW5nX3RvXSA9IGJvYXJkW2Nhc3RsaW5nX2Zyb21dXG4gICAgICAgIGJvYXJkW2Nhc3RsaW5nX2Zyb21dID0gbnVsbFxuICAgICAgfSBlbHNlIGlmIChtb3ZlLmZsYWdzICYgQklUUy5RU0lERV9DQVNUTEUpIHtcbiAgICAgICAgdmFyIGNhc3RsaW5nX3RvID0gbW92ZS50byArIDFcbiAgICAgICAgdmFyIGNhc3RsaW5nX2Zyb20gPSBtb3ZlLnRvIC0gMlxuICAgICAgICBib2FyZFtjYXN0bGluZ190b10gPSBib2FyZFtjYXN0bGluZ19mcm9tXVxuICAgICAgICBib2FyZFtjYXN0bGluZ19mcm9tXSA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLyogdHVybiBvZmYgY2FzdGxpbmcgKi9cbiAgICAgIGNhc3RsaW5nW3VzXSA9ICcnXG4gICAgfVxuXG4gICAgLyogdHVybiBvZmYgY2FzdGxpbmcgaWYgd2UgbW92ZSBhIHJvb2sgKi9cbiAgICBpZiAoY2FzdGxpbmdbdXNdKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gUk9PS1NbdXNdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb3ZlLmZyb20gPT09IFJPT0tTW3VzXVtpXS5zcXVhcmUgJiZcbiAgICAgICAgICBjYXN0bGluZ1t1c10gJiBST09LU1t1c11baV0uZmxhZ1xuICAgICAgICApIHtcbiAgICAgICAgICBjYXN0bGluZ1t1c10gXj0gUk9PS1NbdXNdW2ldLmZsYWdcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogdHVybiBvZmYgY2FzdGxpbmcgaWYgd2UgY2FwdHVyZSBhIHJvb2sgKi9cbiAgICBpZiAoY2FzdGxpbmdbdGhlbV0pIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBST09LU1t0aGVtXS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbW92ZS50byA9PT0gUk9PS1NbdGhlbV1baV0uc3F1YXJlICYmXG4gICAgICAgICAgY2FzdGxpbmdbdGhlbV0gJiBST09LU1t0aGVtXVtpXS5mbGFnXG4gICAgICAgICkge1xuICAgICAgICAgIGNhc3RsaW5nW3RoZW1dIF49IFJPT0tTW3RoZW1dW2ldLmZsYWdcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogaWYgYmlnIHBhd24gbW92ZSwgdXBkYXRlIHRoZSBlbiBwYXNzYW50IHNxdWFyZSAqL1xuICAgIGlmIChtb3ZlLmZsYWdzICYgQklUUy5CSUdfUEFXTikge1xuICAgICAgaWYgKHR1cm4gPT09ICdiJykge1xuICAgICAgICBlcF9zcXVhcmUgPSBtb3ZlLnRvIC0gMTZcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVwX3NxdWFyZSA9IG1vdmUudG8gKyAxNlxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlcF9zcXVhcmUgPSBFTVBUWVxuICAgIH1cblxuICAgIC8qIHJlc2V0IHRoZSA1MCBtb3ZlIGNvdW50ZXIgaWYgYSBwYXduIGlzIG1vdmVkIG9yIGEgcGllY2UgaXMgY2FwdHVyZWQgKi9cbiAgICBpZiAobW92ZS5waWVjZSA9PT0gUEFXTikge1xuICAgICAgaGFsZl9tb3ZlcyA9IDBcbiAgICB9IGVsc2UgaWYgKG1vdmUuZmxhZ3MgJiAoQklUUy5DQVBUVVJFIHwgQklUUy5FUF9DQVBUVVJFKSkge1xuICAgICAgaGFsZl9tb3ZlcyA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgaGFsZl9tb3ZlcysrXG4gICAgfVxuXG4gICAgaWYgKHR1cm4gPT09IEJMQUNLKSB7XG4gICAgICBtb3ZlX251bWJlcisrXG4gICAgfVxuICAgIHR1cm4gPSBzd2FwX2NvbG9yKHR1cm4pXG4gIH1cblxuICBmdW5jdGlvbiB1bmRvX21vdmUoKSB7XG4gICAgdmFyIG9sZCA9IGhpc3RvcnkucG9wKClcbiAgICBpZiAob2xkID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgdmFyIG1vdmUgPSBvbGQubW92ZVxuICAgIGtpbmdzID0gb2xkLmtpbmdzXG4gICAgdHVybiA9IG9sZC50dXJuXG4gICAgY2FzdGxpbmcgPSBvbGQuY2FzdGxpbmdcbiAgICBlcF9zcXVhcmUgPSBvbGQuZXBfc3F1YXJlXG4gICAgaGFsZl9tb3ZlcyA9IG9sZC5oYWxmX21vdmVzXG4gICAgbW92ZV9udW1iZXIgPSBvbGQubW92ZV9udW1iZXJcblxuICAgIHZhciB1cyA9IHR1cm5cbiAgICB2YXIgdGhlbSA9IHN3YXBfY29sb3IodHVybilcblxuICAgIGJvYXJkW21vdmUuZnJvbV0gPSBib2FyZFttb3ZlLnRvXVxuICAgIGJvYXJkW21vdmUuZnJvbV0udHlwZSA9IG1vdmUucGllY2UgLy8gdG8gdW5kbyBhbnkgcHJvbW90aW9uc1xuICAgIGJvYXJkW21vdmUudG9dID0gbnVsbFxuXG4gICAgaWYgKG1vdmUuZmxhZ3MgJiBCSVRTLkNBUFRVUkUpIHtcbiAgICAgIGJvYXJkW21vdmUudG9dID0geyB0eXBlOiBtb3ZlLmNhcHR1cmVkLCBjb2xvcjogdGhlbSB9XG4gICAgfSBlbHNlIGlmIChtb3ZlLmZsYWdzICYgQklUUy5FUF9DQVBUVVJFKSB7XG4gICAgICB2YXIgaW5kZXhcbiAgICAgIGlmICh1cyA9PT0gQkxBQ0spIHtcbiAgICAgICAgaW5kZXggPSBtb3ZlLnRvIC0gMTZcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gbW92ZS50byArIDE2XG4gICAgICB9XG4gICAgICBib2FyZFtpbmRleF0gPSB7IHR5cGU6IFBBV04sIGNvbG9yOiB0aGVtIH1cbiAgICB9XG5cbiAgICBpZiAobW92ZS5mbGFncyAmIChCSVRTLktTSURFX0NBU1RMRSB8IEJJVFMuUVNJREVfQ0FTVExFKSkge1xuICAgICAgdmFyIGNhc3RsaW5nX3RvLCBjYXN0bGluZ19mcm9tXG4gICAgICBpZiAobW92ZS5mbGFncyAmIEJJVFMuS1NJREVfQ0FTVExFKSB7XG4gICAgICAgIGNhc3RsaW5nX3RvID0gbW92ZS50byArIDFcbiAgICAgICAgY2FzdGxpbmdfZnJvbSA9IG1vdmUudG8gLSAxXG4gICAgICB9IGVsc2UgaWYgKG1vdmUuZmxhZ3MgJiBCSVRTLlFTSURFX0NBU1RMRSkge1xuICAgICAgICBjYXN0bGluZ190byA9IG1vdmUudG8gLSAyXG4gICAgICAgIGNhc3RsaW5nX2Zyb20gPSBtb3ZlLnRvICsgMVxuICAgICAgfVxuXG4gICAgICBib2FyZFtjYXN0bGluZ190b10gPSBib2FyZFtjYXN0bGluZ19mcm9tXVxuICAgICAgYm9hcmRbY2FzdGxpbmdfZnJvbV0gPSBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIG1vdmVcbiAgfVxuXG4gIC8qIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBhbWJpZ3VvdXMgbW92ZXMgKi9cbiAgZnVuY3Rpb24gZ2V0X2Rpc2FtYmlndWF0b3IobW92ZSwgbW92ZXMpIHtcbiAgICB2YXIgZnJvbSA9IG1vdmUuZnJvbVxuICAgIHZhciB0byA9IG1vdmUudG9cbiAgICB2YXIgcGllY2UgPSBtb3ZlLnBpZWNlXG5cbiAgICB2YXIgYW1iaWd1aXRpZXMgPSAwXG4gICAgdmFyIHNhbWVfcmFuayA9IDBcbiAgICB2YXIgc2FtZV9maWxlID0gMFxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1vdmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYW1iaWdfZnJvbSA9IG1vdmVzW2ldLmZyb21cbiAgICAgIHZhciBhbWJpZ190byA9IG1vdmVzW2ldLnRvXG4gICAgICB2YXIgYW1iaWdfcGllY2UgPSBtb3Zlc1tpXS5waWVjZVxuXG4gICAgICAvKiBpZiBhIG1vdmUgb2YgdGhlIHNhbWUgcGllY2UgdHlwZSBlbmRzIG9uIHRoZSBzYW1lIHRvIHNxdWFyZSwgd2UnbGxcbiAgICAgICAqIG5lZWQgdG8gYWRkIGEgZGlzYW1iaWd1YXRvciB0byB0aGUgYWxnZWJyYWljIG5vdGF0aW9uXG4gICAgICAgKi9cbiAgICAgIGlmIChwaWVjZSA9PT0gYW1iaWdfcGllY2UgJiYgZnJvbSAhPT0gYW1iaWdfZnJvbSAmJiB0byA9PT0gYW1iaWdfdG8pIHtcbiAgICAgICAgYW1iaWd1aXRpZXMrK1xuXG4gICAgICAgIGlmIChyYW5rKGZyb20pID09PSByYW5rKGFtYmlnX2Zyb20pKSB7XG4gICAgICAgICAgc2FtZV9yYW5rKytcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWxlKGZyb20pID09PSBmaWxlKGFtYmlnX2Zyb20pKSB7XG4gICAgICAgICAgc2FtZV9maWxlKytcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbWJpZ3VpdGllcyA+IDApIHtcbiAgICAgIC8qIGlmIHRoZXJlIGV4aXN0cyBhIHNpbWlsYXIgbW92aW5nIHBpZWNlIG9uIHRoZSBzYW1lIHJhbmsgYW5kIGZpbGUgYXNcbiAgICAgICAqIHRoZSBtb3ZlIGluIHF1ZXN0aW9uLCB1c2UgdGhlIHNxdWFyZSBhcyB0aGUgZGlzYW1iaWd1YXRvclxuICAgICAgICovXG4gICAgICBpZiAoc2FtZV9yYW5rID4gMCAmJiBzYW1lX2ZpbGUgPiAwKSB7XG4gICAgICAgIHJldHVybiBhbGdlYnJhaWMoZnJvbSlcbiAgICAgIH0gZWxzZSBpZiAoc2FtZV9maWxlID4gMCkge1xuICAgICAgICAvKiBpZiB0aGUgbW92aW5nIHBpZWNlIHJlc3RzIG9uIHRoZSBzYW1lIGZpbGUsIHVzZSB0aGUgcmFuayBzeW1ib2wgYXMgdGhlXG4gICAgICAgICAqIGRpc2FtYmlndWF0b3JcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBhbGdlYnJhaWMoZnJvbSkuY2hhckF0KDEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBlbHNlIHVzZSB0aGUgZmlsZSBzeW1ib2wgKi9cbiAgICAgICAgcmV0dXJuIGFsZ2VicmFpYyhmcm9tKS5jaGFyQXQoMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZmVyX3BpZWNlX3R5cGUoc2FuKSB7XG4gICAgdmFyIHBpZWNlX3R5cGUgPSBzYW4uY2hhckF0KDApXG4gICAgaWYgKHBpZWNlX3R5cGUgPj0gJ2EnICYmIHBpZWNlX3R5cGUgPD0gJ2gnKSB7XG4gICAgICB2YXIgbWF0Y2hlcyA9IHNhbi5tYXRjaCgvW2EtaF1cXGQuKlthLWhdXFxkLylcbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHJldHVybiBQQVdOXG4gICAgfVxuICAgIHBpZWNlX3R5cGUgPSBwaWVjZV90eXBlLnRvTG93ZXJDYXNlKClcbiAgICBpZiAocGllY2VfdHlwZSA9PT0gJ28nKSB7XG4gICAgICByZXR1cm4gS0lOR1xuICAgIH1cbiAgICByZXR1cm4gcGllY2VfdHlwZVxuICB9XG4gIGZ1bmN0aW9uIGFzY2lpKCkge1xuICAgIHZhciBzID0gJyAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXFxuJ1xuICAgIGZvciAodmFyIGkgPSBTUVVBUkVTLmE4OyBpIDw9IFNRVUFSRVMuaDE7IGkrKykge1xuICAgICAgLyogZGlzcGxheSB0aGUgcmFuayAqL1xuICAgICAgaWYgKGZpbGUoaSkgPT09IDApIHtcbiAgICAgICAgcyArPSAnICcgKyAnODc2NTQzMjEnW3JhbmsoaSldICsgJyB8J1xuICAgICAgfVxuXG4gICAgICAvKiBlbXB0eSBwaWVjZSAqL1xuICAgICAgaWYgKGJvYXJkW2ldID09IG51bGwpIHtcbiAgICAgICAgcyArPSAnIC4gJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBpZWNlID0gYm9hcmRbaV0udHlwZVxuICAgICAgICB2YXIgY29sb3IgPSBib2FyZFtpXS5jb2xvclxuICAgICAgICB2YXIgc3ltYm9sID0gY29sb3IgPT09IFdISVRFID8gcGllY2UudG9VcHBlckNhc2UoKSA6IHBpZWNlLnRvTG93ZXJDYXNlKClcbiAgICAgICAgcyArPSAnICcgKyBzeW1ib2wgKyAnICdcbiAgICAgIH1cblxuICAgICAgaWYgKChpICsgMSkgJiAweDg4KSB7XG4gICAgICAgIHMgKz0gJ3xcXG4nXG4gICAgICAgIGkgKz0gOFxuICAgICAgfVxuICAgIH1cbiAgICBzICs9ICcgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xcbidcbiAgICBzICs9ICcgICAgIGEgIGIgIGMgIGQgIGUgIGYgIGcgIGhcXG4nXG5cbiAgICByZXR1cm4gc1xuICB9XG5cbiAgLy8gY29udmVydCBhIG1vdmUgZnJvbSBTdGFuZGFyZCBBbGdlYnJhaWMgTm90YXRpb24gKFNBTikgdG8gMHg4OCBjb29yZGluYXRlc1xuICBmdW5jdGlvbiBtb3ZlX2Zyb21fc2FuKG1vdmUsIHNsb3BweSkge1xuICAgIC8vIHN0cmlwIG9mZiBhbnkgbW92ZSBkZWNvcmF0aW9uczogZS5nIE5mMys/ISBiZWNvbWVzIE5mM1xuICAgIHZhciBjbGVhbl9tb3ZlID0gc3RyaXBwZWRfc2FuKG1vdmUpXG5cbiAgICB2YXIgb3Zlcmx5X2Rpc2FtYmlndWF0ZWQgPSBmYWxzZVxuXG4gICAgaWYgKHNsb3BweSkge1xuICAgICAgLy8gVGhlIHNsb3BweSBwYXJzZXIgYWxsb3dzIHRoZSB1c2VyIHRvIHBhcnNlIG5vbi1zdGFuZGFyZCBjaGVzc1xuICAgICAgLy8gbm90YXRpb25zLiBUaGlzIHBhcnNlciBpcyBvcHQtaW4gKGJ5IHNwZWNpZnlpbmcgdGhlXG4gICAgICAvLyAneyBzbG9wcHk6IHRydWUgfScgc2V0dGluZykgYW5kIGlzIG9ubHkgcnVuIGFmdGVyIHRoZSBTdGFuZGFyZFxuICAgICAgLy8gQWxnZWJyYWljIE5vdGF0aW9uIChTQU4pIHBhcnNlciBoYXMgZmFpbGVkLlxuICAgICAgLy9cbiAgICAgIC8vIFdoZW4gcnVubmluZyB0aGUgc2xvcHB5IHBhcnNlciwgd2UnbGwgcnVuIGEgcmVnZXggdG8gZ3JhYiB0aGUgcGllY2UsXG4gICAgICAvLyB0aGUgdG8vZnJvbSBzcXVhcmUsIGFuZCBhbiBvcHRpb25hbCBwcm9tb3Rpb24gcGllY2UuIFRoaXMgcmVnZXggd2lsbFxuICAgICAgLy8gcGFyc2UgY29tbW9uIG5vbi1zdGFuZGFyZCBub3RhdGlvbiBsaWtlOiBQZTItZTQsIFJjMWM0LCBRZjN4ZjcsIGY3ZjhxLFxuICAgICAgLy8gYjFjM1xuXG4gICAgICAvLyBOT1RFOiBTb21lIHBvc2l0aW9ucyBhbmQgbW92ZXMgbWF5IGJlIGFtYmlndW91cyB3aGVuIHVzaW5nIHRoZSBzbG9wcHlcbiAgICAgIC8vIHBhcnNlci4gRm9yIGV4YW1wbGUsIGluIHRoaXMgcG9zaXRpb246IDZrMS84LzgvQjcvOC84LzgvQk40SzEgdyAtIC0gMCAxLFxuICAgICAgLy8gdGhlIG1vdmUgYjFjMyBtYXkgYmUgaW50ZXJwcmV0ZWQgYXMgTmMzIG9yIEIxYzMgKGEgZGlzYW1iaWd1YXRlZFxuICAgICAgLy8gYmlzaG9wIG1vdmUpLiBJbiB0aGVzZSBjYXNlcywgdGhlIHNsb3BweSBwYXJzZXIgd2lsbCBkZWZhdWx0IHRvIHRoZVxuICAgICAgLy8gbW9zdCBtb3N0IGJhc2ljIGludGVycHJldGF0aW9uIC0gYjFjMyBwYXJzZXMgdG8gTmMzLlxuXG4gICAgICB2YXIgbWF0Y2hlcyA9IGNsZWFuX21vdmUubWF0Y2goXG4gICAgICAgIC8oW3BuYnJxa1BOQlJRS10pPyhbYS1oXVsxLThdKXg/LT8oW2EtaF1bMS04XSkoW3FyYm5RUkJOXSk/L1xuICAgICAgKVxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgdmFyIHBpZWNlID0gbWF0Y2hlc1sxXVxuICAgICAgICB2YXIgZnJvbSA9IG1hdGNoZXNbMl1cbiAgICAgICAgdmFyIHRvID0gbWF0Y2hlc1szXVxuICAgICAgICB2YXIgcHJvbW90aW9uID0gbWF0Y2hlc1s0XVxuXG4gICAgICAgIGlmIChmcm9tLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgb3Zlcmx5X2Rpc2FtYmlndWF0ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBbYS1oXT9bMS04XT8gcG9ydGlvbiBvZiB0aGUgcmVnZXggYmVsb3cgaGFuZGxlcyBtb3ZlcyB0aGF0IG1heVxuICAgICAgICAvLyBiZSBvdmVybHkgZGlzYW1iaWd1YXRlZCAoZS5nLiBOZ2U3IGlzIHVubmVjZXNzYXJ5IGFuZCBub24tc3RhbmRhcmRcbiAgICAgICAgLy8gd2hlbiB0aGVyZSBpcyBvbmUgbGVnYWwga25pZ2h0IG1vdmUgdG8gZTcpLiBJbiB0aGlzIGNhc2UsIHRoZSB2YWx1ZVxuICAgICAgICAvLyBvZiAnZnJvbScgdmFyaWFibGUgd2lsbCBiZSBhIHJhbmsgb3IgZmlsZSwgbm90IGEgc3F1YXJlLlxuICAgICAgICB2YXIgbWF0Y2hlcyA9IGNsZWFuX21vdmUubWF0Y2goXG4gICAgICAgICAgLyhbcG5icnFrUE5CUlFLXSk/KFthLWhdP1sxLThdPyl4Py0/KFthLWhdWzEtOF0pKFtxcmJuUVJCTl0pPy9cbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgdmFyIHBpZWNlID0gbWF0Y2hlc1sxXVxuICAgICAgICAgIHZhciBmcm9tID0gbWF0Y2hlc1syXVxuICAgICAgICAgIHZhciB0byA9IG1hdGNoZXNbM11cbiAgICAgICAgICB2YXIgcHJvbW90aW9uID0gbWF0Y2hlc1s0XVxuXG4gICAgICAgICAgaWYgKGZyb20ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHZhciBvdmVybHlfZGlzYW1iaWd1YXRlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcGllY2VfdHlwZSA9IGluZmVyX3BpZWNlX3R5cGUoY2xlYW5fbW92ZSlcbiAgICB2YXIgbW92ZXMgPSBnZW5lcmF0ZV9tb3Zlcyh7XG4gICAgICBsZWdhbDogdHJ1ZSxcbiAgICAgIHBpZWNlOiBwaWVjZSA/IHBpZWNlIDogcGllY2VfdHlwZSxcbiAgICB9KVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1vdmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAvLyB0cnkgdGhlIHN0cmljdCBwYXJzZXIgZmlyc3QsIHRoZW4gdGhlIHNsb3BweSBwYXJzZXIgaWYgcmVxdWVzdGVkXG4gICAgICAvLyBieSB0aGUgdXNlclxuICAgICAgaWYgKGNsZWFuX21vdmUgPT09IHN0cmlwcGVkX3Nhbihtb3ZlX3RvX3Nhbihtb3Zlc1tpXSwgbW92ZXMpKSkge1xuICAgICAgICByZXR1cm4gbW92ZXNbaV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzbG9wcHkgJiYgbWF0Y2hlcykge1xuICAgICAgICAgIC8vIGhhbmQtY29tcGFyZSBtb3ZlIHByb3BlcnRpZXMgd2l0aCB0aGUgcmVzdWx0cyBmcm9tIG91ciBzbG9wcHlcbiAgICAgICAgICAvLyByZWdleFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICghcGllY2UgfHwgcGllY2UudG9Mb3dlckNhc2UoKSA9PSBtb3Zlc1tpXS5waWVjZSkgJiZcbiAgICAgICAgICAgIFNRVUFSRVNbZnJvbV0gPT0gbW92ZXNbaV0uZnJvbSAmJlxuICAgICAgICAgICAgU1FVQVJFU1t0b10gPT0gbW92ZXNbaV0udG8gJiZcbiAgICAgICAgICAgICghcHJvbW90aW9uIHx8IHByb21vdGlvbi50b0xvd2VyQ2FzZSgpID09IG1vdmVzW2ldLnByb21vdGlvbilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBtb3Zlc1tpXVxuICAgICAgICAgIH0gZWxzZSBpZiAob3Zlcmx5X2Rpc2FtYmlndWF0ZWQpIHtcbiAgICAgICAgICAgIC8vIFNQRUNJQUwgQ0FTRTogd2UgcGFyc2VkIGEgbW92ZSBzdHJpbmcgdGhhdCBtYXkgaGF2ZSBhbiB1bm5lZWRlZFxuICAgICAgICAgICAgLy8gcmFuay9maWxlIGRpc2FtYmlndWF0b3IgKGUuZy4gTmdlNykuICBUaGUgJ2Zyb20nIHZhcmlhYmxlIHdpbGxcbiAgICAgICAgICAgIHZhciBzcXVhcmUgPSBhbGdlYnJhaWMobW92ZXNbaV0uZnJvbSlcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKCFwaWVjZSB8fCBwaWVjZS50b0xvd2VyQ2FzZSgpID09IG1vdmVzW2ldLnBpZWNlKSAmJlxuICAgICAgICAgICAgICBTUVVBUkVTW3RvXSA9PSBtb3Zlc1tpXS50byAmJlxuICAgICAgICAgICAgICAoZnJvbSA9PSBzcXVhcmVbMF0gfHwgZnJvbSA9PSBzcXVhcmVbMV0pICYmXG4gICAgICAgICAgICAgICghcHJvbW90aW9uIHx8IHByb21vdGlvbi50b0xvd2VyQ2FzZSgpID09IG1vdmVzW2ldLnByb21vdGlvbilcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gbW92ZXNbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFVUSUxJVFkgRlVOQ1RJT05TXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBmdW5jdGlvbiByYW5rKGkpIHtcbiAgICByZXR1cm4gaSA+PiA0XG4gIH1cblxuICBmdW5jdGlvbiBmaWxlKGkpIHtcbiAgICByZXR1cm4gaSAmIDE1XG4gIH1cblxuICBmdW5jdGlvbiBhbGdlYnJhaWMoaSkge1xuICAgIHZhciBmID0gZmlsZShpKSxcbiAgICAgIHIgPSByYW5rKGkpXG4gICAgcmV0dXJuICdhYmNkZWZnaCcuc3Vic3RyaW5nKGYsIGYgKyAxKSArICc4NzY1NDMyMScuc3Vic3RyaW5nKHIsIHIgKyAxKVxuICB9XG5cbiAgZnVuY3Rpb24gc3dhcF9jb2xvcihjKSB7XG4gICAgcmV0dXJuIGMgPT09IFdISVRFID8gQkxBQ0sgOiBXSElURVxuICB9XG5cbiAgZnVuY3Rpb24gaXNfZGlnaXQoYykge1xuICAgIHJldHVybiAnMDEyMzQ1Njc4OScuaW5kZXhPZihjKSAhPT0gLTFcbiAgfVxuXG4gIC8qIHByZXR0eSA9IGV4dGVybmFsIG1vdmUgb2JqZWN0ICovXG4gIGZ1bmN0aW9uIG1ha2VfcHJldHR5KHVnbHlfbW92ZSkge1xuICAgIHZhciBtb3ZlID0gY2xvbmUodWdseV9tb3ZlKVxuICAgIG1vdmUuc2FuID0gbW92ZV90b19zYW4obW92ZSwgZ2VuZXJhdGVfbW92ZXMoeyBsZWdhbDogdHJ1ZSB9KSlcbiAgICBtb3ZlLnRvID0gYWxnZWJyYWljKG1vdmUudG8pXG4gICAgbW92ZS5mcm9tID0gYWxnZWJyYWljKG1vdmUuZnJvbSlcblxuICAgIHZhciBmbGFncyA9ICcnXG5cbiAgICBmb3IgKHZhciBmbGFnIGluIEJJVFMpIHtcbiAgICAgIGlmIChCSVRTW2ZsYWddICYgbW92ZS5mbGFncykge1xuICAgICAgICBmbGFncyArPSBGTEFHU1tmbGFnXVxuICAgICAgfVxuICAgIH1cbiAgICBtb3ZlLmZsYWdzID0gZmxhZ3NcblxuICAgIHJldHVybiBtb3ZlXG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICB2YXIgZHVwZSA9IG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gW10gOiB7fVxuXG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBkdXBlW3Byb3BlcnR5XSA9IGNsb25lKG9ialtwcm9wZXJ0eV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkdXBlW3Byb3BlcnR5XSA9IG9ialtwcm9wZXJ0eV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHVwZVxuICB9XG5cbiAgZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIERFQlVHR0lORyBVVElMSVRJRVNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIGZ1bmN0aW9uIHBlcmZ0KGRlcHRoKSB7XG4gICAgdmFyIG1vdmVzID0gZ2VuZXJhdGVfbW92ZXMoeyBsZWdhbDogZmFsc2UgfSlcbiAgICB2YXIgbm9kZXMgPSAwXG4gICAgdmFyIGNvbG9yID0gdHVyblxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1vdmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBtYWtlX21vdmUobW92ZXNbaV0pXG4gICAgICBpZiAoIWtpbmdfYXR0YWNrZWQoY29sb3IpKSB7XG4gICAgICAgIGlmIChkZXB0aCAtIDEgPiAwKSB7XG4gICAgICAgICAgdmFyIGNoaWxkX25vZGVzID0gcGVyZnQoZGVwdGggLSAxKVxuICAgICAgICAgIG5vZGVzICs9IGNoaWxkX25vZGVzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZXMrK1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1bmRvX21vdmUoKVxuICAgIH1cblxuICAgIHJldHVybiBub2Rlc1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogUFVCTElDIENPTlNUQU5UUyAoaXMgdGhlcmUgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXM/KVxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBXSElURTogV0hJVEUsXG4gICAgQkxBQ0s6IEJMQUNLLFxuICAgIFBBV046IFBBV04sXG4gICAgS05JR0hUOiBLTklHSFQsXG4gICAgQklTSE9QOiBCSVNIT1AsXG4gICAgUk9PSzogUk9PSyxcbiAgICBRVUVFTjogUVVFRU4sXG4gICAgS0lORzogS0lORyxcbiAgICBTUVVBUkVTOiAoZnVuY3Rpb24gKCkge1xuICAgICAgLyogZnJvbSB0aGUgRUNNQS0yNjIgc3BlYyAoc2VjdGlvbiAxMi42LjQpOlxuICAgICAgICogXCJUaGUgbWVjaGFuaWNzIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIC4uLiBpc1xuICAgICAgICogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XCJcbiAgICAgICAqIHNvOiBmb3IgKHZhciBzcSBpbiBTUVVBUkVTKSB7IGtleXMucHVzaChzcSk7IH0gbWlnaHQgbm90IGJlXG4gICAgICAgKiBvcmRlcmVkIGNvcnJlY3RseVxuICAgICAgICovXG4gICAgICB2YXIga2V5cyA9IFtdXG4gICAgICBmb3IgKHZhciBpID0gU1FVQVJFUy5hODsgaSA8PSBTUVVBUkVTLmgxOyBpKyspIHtcbiAgICAgICAgaWYgKGkgJiAweDg4KSB7XG4gICAgICAgICAgaSArPSA3XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goYWxnZWJyYWljKGkpKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGtleXNcbiAgICB9KSgpLFxuICAgIEZMQUdTOiBGTEFHUyxcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBQVUJMSUMgQVBJXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uIChmZW4pIHtcbiAgICAgIHJldHVybiBsb2FkKGZlbilcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXNldCgpXG4gICAgfSxcblxuICAgIG1vdmVzOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgLyogVGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlc3MgbW92ZSBpcyBpbiAweDg4IGZvcm1hdCwgYW5kXG4gICAgICAgKiBub3QgbWVhbnQgdG8gYmUgaHVtYW4tcmVhZGFibGUuICBUaGUgY29kZSBiZWxvdyBjb252ZXJ0cyB0aGUgMHg4OFxuICAgICAgICogc3F1YXJlIGNvb3JkaW5hdGVzIHRvIGFsZ2VicmFpYyBjb29yZGluYXRlcy4gIEl0IGFsc28gcHJ1bmVzIGFuXG4gICAgICAgKiB1bm5lY2Vzc2FyeSBtb3ZlIGtleXMgcmVzdWx0aW5nIGZyb20gYSB2ZXJib3NlIGNhbGwuXG4gICAgICAgKi9cblxuICAgICAgdmFyIHVnbHlfbW92ZXMgPSBnZW5lcmF0ZV9tb3ZlcyhvcHRpb25zKVxuICAgICAgdmFyIG1vdmVzID0gW11cblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHVnbHlfbW92ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLyogZG9lcyB0aGUgdXNlciB3YW50IGEgZnVsbCBtb3ZlIG9iamVjdCAobW9zdCBsaWtlbHkgbm90KSwgb3IganVzdFxuICAgICAgICAgKiBTQU5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAndmVyYm9zZScgaW4gb3B0aW9ucyAmJlxuICAgICAgICAgIG9wdGlvbnMudmVyYm9zZVxuICAgICAgICApIHtcbiAgICAgICAgICBtb3Zlcy5wdXNoKG1ha2VfcHJldHR5KHVnbHlfbW92ZXNbaV0pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1vdmVzLnB1c2goXG4gICAgICAgICAgICBtb3ZlX3RvX3Nhbih1Z2x5X21vdmVzW2ldLCBnZW5lcmF0ZV9tb3Zlcyh7IGxlZ2FsOiB0cnVlIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW92ZXNcbiAgICB9LFxuXG4gICAgaW5fY2hlY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpbl9jaGVjaygpXG4gICAgfSxcblxuICAgIGluX2NoZWNrbWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGluX2NoZWNrbWF0ZSgpXG4gICAgfSxcblxuICAgIGluX3N0YWxlbWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGluX3N0YWxlbWF0ZSgpXG4gICAgfSxcblxuICAgIGluX2RyYXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGhhbGZfbW92ZXMgPj0gMTAwIHx8XG4gICAgICAgIGluX3N0YWxlbWF0ZSgpIHx8XG4gICAgICAgIGluc3VmZmljaWVudF9tYXRlcmlhbCgpIHx8XG4gICAgICAgIGluX3RocmVlZm9sZF9yZXBldGl0aW9uKClcbiAgICAgIClcbiAgICB9LFxuXG4gICAgaW5zdWZmaWNpZW50X21hdGVyaWFsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaW5zdWZmaWNpZW50X21hdGVyaWFsKClcbiAgICB9LFxuXG4gICAgaW5fdGhyZWVmb2xkX3JlcGV0aXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpbl90aHJlZWZvbGRfcmVwZXRpdGlvbigpXG4gICAgfSxcblxuICAgIGdhbWVfb3ZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaGFsZl9tb3ZlcyA+PSAxMDAgfHxcbiAgICAgICAgaW5fY2hlY2ttYXRlKCkgfHxcbiAgICAgICAgaW5fc3RhbGVtYXRlKCkgfHxcbiAgICAgICAgaW5zdWZmaWNpZW50X21hdGVyaWFsKCkgfHxcbiAgICAgICAgaW5fdGhyZWVmb2xkX3JlcGV0aXRpb24oKVxuICAgICAgKVxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZV9mZW46IGZ1bmN0aW9uIChmZW4pIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZV9mZW4oZmVuKVxuICAgIH0sXG5cbiAgICBmZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZV9mZW4oKVxuICAgIH0sXG5cbiAgICBib2FyZDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgICByb3cgPSBbXVxuXG4gICAgICBmb3IgKHZhciBpID0gU1FVQVJFUy5hODsgaSA8PSBTUVVBUkVTLmgxOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldID09IG51bGwpIHtcbiAgICAgICAgICByb3cucHVzaChudWxsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5wdXNoKHsgdHlwZTogYm9hcmRbaV0udHlwZSwgY29sb3I6IGJvYXJkW2ldLmNvbG9yIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChpICsgMSkgJiAweDg4KSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2gocm93KVxuICAgICAgICAgIHJvdyA9IFtdXG4gICAgICAgICAgaSArPSA4XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dFxuICAgIH0sXG5cbiAgICBwZ246IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAvKiB1c2luZyB0aGUgc3BlY2lmaWNhdGlvbiBmcm9tIGh0dHA6Ly93d3cuY2hlc3NjbHViLmNvbS9oZWxwL1BHTi1zcGVjXG4gICAgICAgKiBleGFtcGxlIGZvciBodG1sIHVzYWdlOiAucGduKHsgbWF4X3dpZHRoOiA3MiwgbmV3bGluZV9jaGFyOiBcIjxiciAvPlwiIH0pXG4gICAgICAgKi9cbiAgICAgIHZhciBuZXdsaW5lID1cbiAgICAgICAgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zLm5ld2xpbmVfY2hhciA9PT0gJ3N0cmluZydcbiAgICAgICAgICA/IG9wdGlvbnMubmV3bGluZV9jaGFyXG4gICAgICAgICAgOiAnXFxuJ1xuICAgICAgdmFyIG1heF93aWR0aCA9XG4gICAgICAgIHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhfd2lkdGggPT09ICdudW1iZXInXG4gICAgICAgICAgPyBvcHRpb25zLm1heF93aWR0aFxuICAgICAgICAgIDogMFxuICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICB2YXIgaGVhZGVyX2V4aXN0cyA9IGZhbHNlXG5cbiAgICAgIC8qIGFkZCB0aGUgUEdOIGhlYWRlciBoZWFkZXJybWF0aW9uICovXG4gICAgICBmb3IgKHZhciBpIGluIGhlYWRlcikge1xuICAgICAgICAvKiBUT0RPOiBvcmRlciBvZiBlbnVtZXJhdGVkIHByb3BlcnRpZXMgaW4gaGVhZGVyIG9iamVjdCBpcyBub3RcbiAgICAgICAgICogZ3VhcmFudGVlZCwgc2VlIEVDTUEtMjYyIHNwZWMgKHNlY3Rpb24gMTIuNi40KVxuICAgICAgICAgKi9cbiAgICAgICAgcmVzdWx0LnB1c2goJ1snICsgaSArICcgXCInICsgaGVhZGVyW2ldICsgJ1wiXScgKyBuZXdsaW5lKVxuICAgICAgICBoZWFkZXJfZXhpc3RzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaGVhZGVyX2V4aXN0cyAmJiBoaXN0b3J5Lmxlbmd0aCkge1xuICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKVxuICAgICAgfVxuXG4gICAgICB2YXIgYXBwZW5kX2NvbW1lbnQgPSBmdW5jdGlvbiAobW92ZV9zdHJpbmcpIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSBjb21tZW50c1tnZW5lcmF0ZV9mZW4oKV1cbiAgICAgICAgaWYgKHR5cGVvZiBjb21tZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhciBkZWxpbWl0ZXIgPSBtb3ZlX3N0cmluZy5sZW5ndGggPiAwID8gJyAnIDogJydcbiAgICAgICAgICBtb3ZlX3N0cmluZyA9IGAke21vdmVfc3RyaW5nfSR7ZGVsaW1pdGVyfXske2NvbW1lbnR9fWBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW92ZV9zdHJpbmdcbiAgICAgIH1cblxuICAgICAgLyogcG9wIGFsbCBvZiBoaXN0b3J5IG9udG8gcmV2ZXJzZWRfaGlzdG9yeSAqL1xuICAgICAgdmFyIHJldmVyc2VkX2hpc3RvcnkgPSBbXVxuICAgICAgd2hpbGUgKGhpc3RvcnkubGVuZ3RoID4gMCkge1xuICAgICAgICByZXZlcnNlZF9oaXN0b3J5LnB1c2godW5kb19tb3ZlKCkpXG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlcyA9IFtdXG4gICAgICB2YXIgbW92ZV9zdHJpbmcgPSAnJ1xuXG4gICAgICAvKiBzcGVjaWFsIGNhc2Ugb2YgYSBjb21tZW50ZWQgc3RhcnRpbmcgcG9zaXRpb24gd2l0aCBubyBtb3ZlcyAqL1xuICAgICAgaWYgKHJldmVyc2VkX2hpc3RvcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vdmVzLnB1c2goYXBwZW5kX2NvbW1lbnQoJycpKVxuICAgICAgfVxuXG4gICAgICAvKiBidWlsZCB0aGUgbGlzdCBvZiBtb3Zlcy4gIGEgbW92ZV9zdHJpbmcgbG9va3MgbGlrZTogXCIzLiBlMyBlNlwiICovXG4gICAgICB3aGlsZSAocmV2ZXJzZWRfaGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1vdmVfc3RyaW5nID0gYXBwZW5kX2NvbW1lbnQobW92ZV9zdHJpbmcpXG4gICAgICAgIHZhciBtb3ZlID0gcmV2ZXJzZWRfaGlzdG9yeS5wb3AoKVxuXG4gICAgICAgIC8qIGlmIHRoZSBwb3NpdGlvbiBzdGFydGVkIHdpdGggYmxhY2sgdG8gbW92ZSwgc3RhcnQgUEdOIHdpdGggMS4gLi4uICovXG4gICAgICAgIGlmICghaGlzdG9yeS5sZW5ndGggJiYgbW92ZS5jb2xvciA9PT0gJ2InKSB7XG4gICAgICAgICAgbW92ZV9zdHJpbmcgPSBtb3ZlX251bWJlciArICcuIC4uLidcbiAgICAgICAgfSBlbHNlIGlmIChtb3ZlLmNvbG9yID09PSAndycpIHtcbiAgICAgICAgICAvKiBzdG9yZSB0aGUgcHJldmlvdXMgZ2VuZXJhdGVkIG1vdmVfc3RyaW5nIGlmIHdlIGhhdmUgb25lICovXG4gICAgICAgICAgaWYgKG1vdmVfc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgbW92ZXMucHVzaChtb3ZlX3N0cmluZylcbiAgICAgICAgICB9XG4gICAgICAgICAgbW92ZV9zdHJpbmcgPSBtb3ZlX251bWJlciArICcuJ1xuICAgICAgICB9XG5cbiAgICAgICAgbW92ZV9zdHJpbmcgPVxuICAgICAgICAgIG1vdmVfc3RyaW5nICsgJyAnICsgbW92ZV90b19zYW4obW92ZSwgZ2VuZXJhdGVfbW92ZXMoeyBsZWdhbDogdHJ1ZSB9KSlcbiAgICAgICAgbWFrZV9tb3ZlKG1vdmUpXG4gICAgICB9XG5cbiAgICAgIC8qIGFyZSB0aGVyZSBhbnkgb3RoZXIgbGVmdG92ZXIgbW92ZXM/ICovXG4gICAgICBpZiAobW92ZV9zdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIG1vdmVzLnB1c2goYXBwZW5kX2NvbW1lbnQobW92ZV9zdHJpbmcpKVxuICAgICAgfVxuXG4gICAgICAvKiBpcyB0aGVyZSBhIHJlc3VsdD8gKi9cbiAgICAgIGlmICh0eXBlb2YgaGVhZGVyLlJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW92ZXMucHVzaChoZWFkZXIuUmVzdWx0KVxuICAgICAgfVxuXG4gICAgICAvKiBoaXN0b3J5IHNob3VsZCBiZSBiYWNrIHRvIHdoYXQgaXQgd2FzIGJlZm9yZSB3ZSBzdGFydGVkIGdlbmVyYXRpbmcgUEdOLFxuICAgICAgICogc28gam9pbiB0b2dldGhlciBtb3Zlc1xuICAgICAgICovXG4gICAgICBpZiAobWF4X3dpZHRoID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignJykgKyBtb3Zlcy5qb2luKCcgJylcbiAgICAgIH1cblxuICAgICAgdmFyIHN0cmlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDAgJiYgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9PT0gJyAnKSB7XG4gICAgICAgICAgcmVzdWx0LnBvcCgpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLyogTkI6IHRoaXMgZG9lcyBub3QgcHJlc2VydmUgY29tbWVudCB3aGl0ZXNwYWNlLiAqL1xuICAgICAgdmFyIHdyYXBfY29tbWVudCA9IGZ1bmN0aW9uICh3aWR0aCwgbW92ZSkge1xuICAgICAgICBmb3IgKHZhciB0b2tlbiBvZiBtb3ZlLnNwbGl0KCcgJykpIHtcbiAgICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkdGggKyB0b2tlbi5sZW5ndGggPiBtYXhfd2lkdGgpIHtcbiAgICAgICAgICAgIHdoaWxlIChzdHJpcCgpKSB7XG4gICAgICAgICAgICAgIHdpZHRoLS1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld2xpbmUpXG4gICAgICAgICAgICB3aWR0aCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0LnB1c2godG9rZW4pXG4gICAgICAgICAgd2lkdGggKz0gdG9rZW4ubGVuZ3RoXG4gICAgICAgICAgcmVzdWx0LnB1c2goJyAnKVxuICAgICAgICAgIHdpZHRoKytcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyaXAoKSkge1xuICAgICAgICAgIHdpZHRoLS1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2lkdGhcbiAgICAgIH1cblxuICAgICAgLyogd3JhcCB0aGUgUEdOIG91dHB1dCBhdCBtYXhfd2lkdGggKi9cbiAgICAgIHZhciBjdXJyZW50X3dpZHRoID0gMFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY3VycmVudF93aWR0aCArIG1vdmVzW2ldLmxlbmd0aCA+IG1heF93aWR0aCkge1xuICAgICAgICAgIGlmIChtb3Zlc1tpXS5pbmNsdWRlcygneycpKSB7XG4gICAgICAgICAgICBjdXJyZW50X3dpZHRoID0gd3JhcF9jb21tZW50KGN1cnJlbnRfd2lkdGgsIG1vdmVzW2ldKVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgdGhlIGN1cnJlbnQgbW92ZSB3aWxsIHB1c2ggcGFzdCBtYXhfd2lkdGggKi9cbiAgICAgICAgaWYgKGN1cnJlbnRfd2lkdGggKyBtb3Zlc1tpXS5sZW5ndGggPiBtYXhfd2lkdGggJiYgaSAhPT0gMCkge1xuICAgICAgICAgIC8qIGRvbid0IGVuZCB0aGUgbGluZSB3aXRoIHdoaXRlc3BhY2UgKi9cbiAgICAgICAgICBpZiAocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICByZXN1bHQucG9wKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHQucHVzaChuZXdsaW5lKVxuICAgICAgICAgIGN1cnJlbnRfd2lkdGggPSAwXG4gICAgICAgIH0gZWxzZSBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKCcgJylcbiAgICAgICAgICBjdXJyZW50X3dpZHRoKytcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChtb3Zlc1tpXSlcbiAgICAgICAgY3VycmVudF93aWR0aCArPSBtb3Zlc1tpXS5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxuICAgIH0sXG5cbiAgICBsb2FkX3BnbjogZnVuY3Rpb24gKHBnbiwgb3B0aW9ucykge1xuICAgICAgLy8gYWxsb3cgdGhlIHVzZXIgdG8gc3BlY2lmeSB0aGUgc2xvcHB5IG1vdmUgcGFyc2VyIHRvIHdvcmsgYXJvdW5kIG92ZXJcbiAgICAgIC8vIGRpc2FtYmlndWF0aW9uIGJ1Z3MgaW4gRnJpdHogYW5kIENoZXNzYmFzZVxuICAgICAgdmFyIHNsb3BweSA9XG4gICAgICAgIHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyAmJiAnc2xvcHB5JyBpbiBvcHRpb25zXG4gICAgICAgICAgPyBvcHRpb25zLnNsb3BweVxuICAgICAgICAgIDogZmFsc2VcblxuICAgICAgZnVuY3Rpb24gbWFzayhzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFxcL2csICdcXFxcJylcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGFzX2tleXMob2JqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwYXJzZV9wZ25faGVhZGVyKGhlYWRlciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgbmV3bGluZV9jaGFyID1cbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5uZXdsaW5lX2NoYXIgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG9wdGlvbnMubmV3bGluZV9jaGFyXG4gICAgICAgICAgICA6ICdcXHI/XFxuJ1xuICAgICAgICB2YXIgaGVhZGVyX29iaiA9IHt9XG4gICAgICAgIHZhciBoZWFkZXJzID0gaGVhZGVyLnNwbGl0KG5ldyBSZWdFeHAobWFzayhuZXdsaW5lX2NoYXIpKSlcbiAgICAgICAgdmFyIGtleSA9ICcnXG4gICAgICAgIHZhciB2YWx1ZSA9ICcnXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAga2V5ID0gaGVhZGVyc1tpXS5yZXBsYWNlKC9eXFxbKFtBLVpdW0EtWmEtel0qKVxccy4qXFxdJC8sICckMScpXG4gICAgICAgICAgdmFsdWUgPSBoZWFkZXJzW2ldLnJlcGxhY2UoL15cXFtbQS1aYS16XStcXHNcIiguKilcIlxcICpcXF0kLywgJyQxJylcbiAgICAgICAgICBpZiAodHJpbShrZXkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGhlYWRlcl9vYmpba2V5XSA9IHZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlcl9vYmpcbiAgICAgIH1cblxuICAgICAgdmFyIG5ld2xpbmVfY2hhciA9XG4gICAgICAgIHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucy5uZXdsaW5lX2NoYXIgPT09ICdzdHJpbmcnXG4gICAgICAgICAgPyBvcHRpb25zLm5ld2xpbmVfY2hhclxuICAgICAgICAgIDogJ1xccj9cXG4nXG5cbiAgICAgIC8vIFJlZ0V4cCB0byBzcGxpdCBoZWFkZXIuIFRha2VzIGFkdmFudGFnZSBvZiB0aGUgZmFjdCB0aGF0IGhlYWRlciBhbmQgbW92ZXRleHRcbiAgICAgIC8vIHdpbGwgYWx3YXlzIGhhdmUgYSBibGFuayBsaW5lIGJldHdlZW4gdGhlbSAoaWUsIHR3byBuZXdsaW5lX2NoYXIncykuXG4gICAgICAvLyBXaXRoIGRlZmF1bHQgbmV3bGluZV9jaGFyLCB3aWxsIGVxdWFsOiAvXihcXFsoKD86XFxyP1xcbil8LikqXFxdKSg/Olxccj9cXG4pezJ9L1xuICAgICAgdmFyIGhlYWRlcl9yZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICdeKFxcXFxbKCg/OicgK1xuICAgICAgICAgIG1hc2sobmV3bGluZV9jaGFyKSArXG4gICAgICAgICAgJyl8LikqXFxcXF0pJyArXG4gICAgICAgICAgJyg/OicgK1xuICAgICAgICAgIG1hc2sobmV3bGluZV9jaGFyKSArXG4gICAgICAgICAgJyl7Mn0nXG4gICAgICApXG5cbiAgICAgIC8vIElmIG5vIGhlYWRlciBnaXZlbiwgYmVnaW4gd2l0aCBtb3Zlcy5cbiAgICAgIHZhciBoZWFkZXJfc3RyaW5nID0gaGVhZGVyX3JlZ2V4LnRlc3QocGduKVxuICAgICAgICA/IGhlYWRlcl9yZWdleC5leGVjKHBnbilbMV1cbiAgICAgICAgOiAnJ1xuXG4gICAgICAvLyBQdXQgdGhlIGJvYXJkIGluIHRoZSBzdGFydGluZyBwb3NpdGlvblxuICAgICAgcmVzZXQoKVxuXG4gICAgICAvKiBwYXJzZSBQR04gaGVhZGVyICovXG4gICAgICB2YXIgaGVhZGVycyA9IHBhcnNlX3Bnbl9oZWFkZXIoaGVhZGVyX3N0cmluZywgb3B0aW9ucylcbiAgICAgIGZvciAodmFyIGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgIHNldF9oZWFkZXIoW2tleSwgaGVhZGVyc1trZXldXSlcbiAgICAgIH1cblxuICAgICAgLyogbG9hZCB0aGUgc3RhcnRpbmcgcG9zaXRpb24gaW5kaWNhdGVkIGJ5IFtTZXR1cCAnMSddIGFuZFxuICAgICAgICogW0ZFTiBwb3NpdGlvbl0gKi9cbiAgICAgIGlmIChoZWFkZXJzWydTZXRVcCddID09PSAnMScpIHtcbiAgICAgICAgaWYgKCEoJ0ZFTicgaW4gaGVhZGVycyAmJiBsb2FkKGhlYWRlcnNbJ0ZFTiddLCB0cnVlKSkpIHtcbiAgICAgICAgICAvLyBzZWNvbmQgYXJndW1lbnQgdG8gbG9hZDogZG9uJ3QgY2xlYXIgdGhlIGhlYWRlcnNcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBOQjogdGhlIHJlZ2V4ZXMgYmVsb3cgdGhhdCBkZWxldGUgbW92ZSBudW1iZXJzLCByZWN1cnNpdmVcbiAgICAgICAqIGFubm90YXRpb25zLCBhbmQgbnVtZXJpYyBhbm5vdGF0aW9uIGdseXBocyBtYXkgYWxzbyBtYXRjaFxuICAgICAgICogdGV4dCBpbiBjb21tZW50cy4gVG8gcHJldmVudCB0aGlzLCB3ZSB0cmFuc2Zvcm0gY29tbWVudHNcbiAgICAgICAqIGJ5IGhleC1lbmNvZGluZyB0aGVtIGluIHBsYWNlIGFuZCBkZWNvZGluZyB0aGVtIGFnYWluIGFmdGVyXG4gICAgICAgKiB0aGUgb3RoZXIgdG9rZW5zIGhhdmUgYmVlbiBkZWxldGVkLlxuICAgICAgICpcbiAgICAgICAqIFdoaWxlIHRoZSBzcGVjIHN0YXRlcyB0aGF0IFBHTiBmaWxlcyBzaG91bGQgYmUgQVNDSUkgZW5jb2RlZCxcbiAgICAgICAqIHdlIHVzZSB7ZW4sZGV9Y29kZVVSSUNvbXBvbmVudCBoZXJlIHRvIHN1cHBvcnQgYXJiaXRyYXJ5IFVURjhcbiAgICAgICAqIGFzIGEgY29udmVuaWVuY2UgZm9yIG1vZGVybiB1c2VycyAqL1xuXG4gICAgICB2YXIgdG9faGV4ID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShzdHJpbmcpXG4gICAgICAgICAgLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgLyogZW5jb2RlVVJJIGRvZXNuJ3QgdHJhbnNmb3JtIG1vc3QgQVNDSUkgY2hhcmFjdGVycyxcbiAgICAgICAgICAgICAqIHNvIHdlIGhhbmRsZSB0aGVzZSBvdXJzZWx2ZXMgKi9cbiAgICAgICAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgPCAxMjhcbiAgICAgICAgICAgICAgPyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KGMpLnJlcGxhY2UoL1xcJS9nLCAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIHZhciBmcm9tX2hleCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5sZW5ndGggPT0gMFxuICAgICAgICAgID8gJydcbiAgICAgICAgICA6IGRlY29kZVVSSUNvbXBvbmVudCgnJScgKyBzdHJpbmcubWF0Y2goLy57MSwyfS9nKS5qb2luKCclJykpXG4gICAgICB9XG5cbiAgICAgIHZhciBlbmNvZGVfY29tbWVudCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChtYXNrKG5ld2xpbmVfY2hhciksICdnJyksICcgJylcbiAgICAgICAgcmV0dXJuIGB7JHt0b19oZXgoc3RyaW5nLnNsaWNlKDEsIHN0cmluZy5sZW5ndGggLSAxKSl9fWBcbiAgICAgIH1cblxuICAgICAgdmFyIGRlY29kZV9jb21tZW50ID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBpZiAoc3RyaW5nLnN0YXJ0c1dpdGgoJ3snKSAmJiBzdHJpbmcuZW5kc1dpdGgoJ30nKSkge1xuICAgICAgICAgIHJldHVybiBmcm9tX2hleChzdHJpbmcuc2xpY2UoMSwgc3RyaW5nLmxlbmd0aCAtIDEpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIGRlbGV0ZSBoZWFkZXIgdG8gZ2V0IHRoZSBtb3ZlcyAqL1xuICAgICAgdmFyIG1zID0gcGduXG4gICAgICAgIC5yZXBsYWNlKGhlYWRlcl9zdHJpbmcsICcnKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAvKiBlbmNvZGUgY29tbWVudHMgc28gdGhleSBkb24ndCBnZXQgZGVsZXRlZCBiZWxvdyAqL1xuICAgICAgICAgIG5ldyBSZWdFeHAoYChcXHtbXn1dKlxcfSkrP3w7KFteJHttYXNrKG5ld2xpbmVfY2hhcil9XSopYCwgJ2cnKSxcbiAgICAgICAgICBmdW5jdGlvbiAobWF0Y2gsIGJyYWNrZXQsIHNlbWljb2xvbikge1xuICAgICAgICAgICAgcmV0dXJuIGJyYWNrZXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IGVuY29kZV9jb21tZW50KGJyYWNrZXQpXG4gICAgICAgICAgICAgIDogJyAnICsgZW5jb2RlX2NvbW1lbnQoYHske3NlbWljb2xvbi5zbGljZSgxKX19YClcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChtYXNrKG5ld2xpbmVfY2hhciksICdnJyksICcgJylcblxuICAgICAgLyogZGVsZXRlIHJlY3Vyc2l2ZSBhbm5vdGF0aW9uIHZhcmlhdGlvbnMgKi9cbiAgICAgIHZhciByYXZfcmVnZXggPSAvKFxcKFteXFwoXFwpXStcXCkpKz8vZ1xuICAgICAgd2hpbGUgKHJhdl9yZWdleC50ZXN0KG1zKSkge1xuICAgICAgICBtcyA9IG1zLnJlcGxhY2UocmF2X3JlZ2V4LCAnJylcbiAgICAgIH1cblxuICAgICAgLyogZGVsZXRlIG1vdmUgbnVtYmVycyAqL1xuICAgICAgbXMgPSBtcy5yZXBsYWNlKC9cXGQrXFwuKFxcLlxcLik/L2csICcnKVxuXG4gICAgICAvKiBkZWxldGUgLi4uIGluZGljYXRpbmcgYmxhY2sgdG8gbW92ZSAqL1xuICAgICAgbXMgPSBtcy5yZXBsYWNlKC9cXC5cXC5cXC4vZywgJycpXG5cbiAgICAgIC8qIGRlbGV0ZSBudW1lcmljIGFubm90YXRpb24gZ2x5cGhzICovXG4gICAgICBtcyA9IG1zLnJlcGxhY2UoL1xcJFxcZCsvZywgJycpXG5cbiAgICAgIC8qIHRyaW0gYW5kIGdldCBhcnJheSBvZiBtb3ZlcyAqL1xuICAgICAgdmFyIG1vdmVzID0gdHJpbShtcykuc3BsaXQobmV3IFJlZ0V4cCgvXFxzKy8pKVxuXG4gICAgICAvKiBkZWxldGUgZW1wdHkgZW50cmllcyAqL1xuICAgICAgbW92ZXMgPSBtb3Zlcy5qb2luKCcsJykucmVwbGFjZSgvLCwrL2csICcsJykuc3BsaXQoJywnKVxuICAgICAgdmFyIG1vdmUgPSAnJ1xuXG4gICAgICB2YXIgcmVzdWx0ID0gJydcblxuICAgICAgZm9yICh2YXIgaGFsZl9tb3ZlID0gMDsgaGFsZl9tb3ZlIDwgbW92ZXMubGVuZ3RoOyBoYWxmX21vdmUrKykge1xuICAgICAgICB2YXIgY29tbWVudCA9IGRlY29kZV9jb21tZW50KG1vdmVzW2hhbGZfbW92ZV0pXG4gICAgICAgIGlmIChjb21tZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb21tZW50c1tnZW5lcmF0ZV9mZW4oKV0gPSBjb21tZW50XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdmUgPSBtb3ZlX2Zyb21fc2FuKG1vdmVzW2hhbGZfbW92ZV0sIHNsb3BweSlcblxuICAgICAgICAvKiBpbnZhbGlkIG1vdmUgKi9cbiAgICAgICAgaWYgKG1vdmUgPT0gbnVsbCkge1xuICAgICAgICAgIC8qIHdhcyB0aGUgbW92ZSBhbiBlbmQgb2YgZ2FtZSBtYXJrZXIgKi9cbiAgICAgICAgICBpZiAoVEVSTUlOQVRJT05fTUFSS0VSUy5pbmRleE9mKG1vdmVzW2hhbGZfbW92ZV0pID4gLTEpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG1vdmVzW2hhbGZfbW92ZV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIHJlc2V0IHRoZSBlbmQgb2YgZ2FtZSBtYXJrZXIgaWYgbWFraW5nIGEgdmFsaWQgbW92ZSAqL1xuICAgICAgICAgIHJlc3VsdCA9ICcnXG4gICAgICAgICAgbWFrZV9tb3ZlKG1vdmUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUGVyIHNlY3Rpb24gOC4yLjYgb2YgdGhlIFBHTiBzcGVjLCB0aGUgUmVzdWx0IHRhZyBwYWlyIG11c3QgbWF0Y2hcbiAgICAgICAqIG1hdGNoIHRoZSB0ZXJtaW5hdGlvbiBtYXJrZXIuIE9ubHkgZG8gdGhpcyB3aGVuIGhlYWRlcnMgYXJlIHByZXNlbnQsXG4gICAgICAgKiBidXQgdGhlIHJlc3VsdCB0YWcgaXMgbWlzc2luZ1xuICAgICAgICovXG4gICAgICBpZiAocmVzdWx0ICYmIE9iamVjdC5rZXlzKGhlYWRlcikubGVuZ3RoICYmICFoZWFkZXJbJ1Jlc3VsdCddKSB7XG4gICAgICAgIHNldF9oZWFkZXIoWydSZXN1bHQnLCByZXN1bHRdKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG5cbiAgICBoZWFkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzZXRfaGVhZGVyKGFyZ3VtZW50cylcbiAgICB9LFxuXG4gICAgYXNjaWk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhc2NpaSgpXG4gICAgfSxcblxuICAgIHR1cm46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0dXJuXG4gICAgfSxcblxuICAgIG1vdmU6IGZ1bmN0aW9uIChtb3ZlLCBvcHRpb25zKSB7XG4gICAgICAvKiBUaGUgbW92ZSBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIHdpdGggaW4gdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgICAgICpcbiAgICAgICAqIC5tb3ZlKCdOeGI3JykgICAgICA8LSB3aGVyZSAnbW92ZScgaXMgYSBjYXNlLXNlbnNpdGl2ZSBTQU4gc3RyaW5nXG4gICAgICAgKlxuICAgICAgICogLm1vdmUoeyBmcm9tOiAnaDcnLCA8LSB3aGVyZSB0aGUgJ21vdmUnIGlzIGEgbW92ZSBvYmplY3QgKGFkZGl0aW9uYWxcbiAgICAgICAqICAgICAgICAgdG8gOidoOCcsICAgICAgZmllbGRzIGFyZSBpZ25vcmVkKVxuICAgICAgICogICAgICAgICBwcm9tb3Rpb246ICdxJyxcbiAgICAgICAqICAgICAgfSlcbiAgICAgICAqL1xuXG4gICAgICAvLyBhbGxvdyB0aGUgdXNlciB0byBzcGVjaWZ5IHRoZSBzbG9wcHkgbW92ZSBwYXJzZXIgdG8gd29yayBhcm91bmQgb3ZlclxuICAgICAgLy8gZGlzYW1iaWd1YXRpb24gYnVncyBpbiBGcml0eiBhbmQgQ2hlc3NiYXNlXG4gICAgICB2YXIgc2xvcHB5ID1cbiAgICAgICAgdHlwZW9mIG9wdGlvbnMgIT09ICd1bmRlZmluZWQnICYmICdzbG9wcHknIGluIG9wdGlvbnNcbiAgICAgICAgICA/IG9wdGlvbnMuc2xvcHB5XG4gICAgICAgICAgOiBmYWxzZVxuXG4gICAgICB2YXIgbW92ZV9vYmogPSBudWxsXG5cbiAgICAgIGlmICh0eXBlb2YgbW92ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbW92ZV9vYmogPSBtb3ZlX2Zyb21fc2FuKG1vdmUsIHNsb3BweSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vdmUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBtb3ZlcyA9IGdlbmVyYXRlX21vdmVzKClcblxuICAgICAgICAvKiBjb252ZXJ0IHRoZSBwcmV0dHkgbW92ZSBvYmplY3QgdG8gYW4gdWdseSBtb3ZlIG9iamVjdCAqL1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbW92ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBtb3ZlLmZyb20gPT09IGFsZ2VicmFpYyhtb3Zlc1tpXS5mcm9tKSAmJlxuICAgICAgICAgICAgbW92ZS50byA9PT0gYWxnZWJyYWljKG1vdmVzW2ldLnRvKSAmJlxuICAgICAgICAgICAgKCEoJ3Byb21vdGlvbicgaW4gbW92ZXNbaV0pIHx8XG4gICAgICAgICAgICAgIG1vdmUucHJvbW90aW9uID09PSBtb3Zlc1tpXS5wcm9tb3Rpb24pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBtb3ZlX29iaiA9IG1vdmVzW2ldXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBmYWlsZWQgdG8gZmluZCBtb3ZlICovXG4gICAgICBpZiAoIW1vdmVfb2JqKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIC8qIG5lZWQgdG8gbWFrZSBhIGNvcHkgb2YgbW92ZSBiZWNhdXNlIHdlIGNhbid0IGdlbmVyYXRlIFNBTiBhZnRlciB0aGVcbiAgICAgICAqIG1vdmUgaXMgbWFkZVxuICAgICAgICovXG4gICAgICB2YXIgcHJldHR5X21vdmUgPSBtYWtlX3ByZXR0eShtb3ZlX29iailcblxuICAgICAgbWFrZV9tb3ZlKG1vdmVfb2JqKVxuXG4gICAgICByZXR1cm4gcHJldHR5X21vdmVcbiAgICB9LFxuXG4gICAgdW5kbzogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG1vdmUgPSB1bmRvX21vdmUoKVxuICAgICAgcmV0dXJuIG1vdmUgPyBtYWtlX3ByZXR0eShtb3ZlKSA6IG51bGxcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBjbGVhcigpXG4gICAgfSxcblxuICAgIHB1dDogZnVuY3Rpb24gKHBpZWNlLCBzcXVhcmUpIHtcbiAgICAgIHJldHVybiBwdXQocGllY2UsIHNxdWFyZSlcbiAgICB9LFxuXG4gICAgZ2V0OiBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gICAgICByZXR1cm4gZ2V0KHNxdWFyZSlcbiAgICB9LFxuXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoc3F1YXJlKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlKHNxdWFyZSlcbiAgICB9LFxuXG4gICAgcGVyZnQ6IGZ1bmN0aW9uIChkZXB0aCkge1xuICAgICAgcmV0dXJuIHBlcmZ0KGRlcHRoKVxuICAgIH0sXG5cbiAgICBzcXVhcmVfY29sb3I6IGZ1bmN0aW9uIChzcXVhcmUpIHtcbiAgICAgIGlmIChzcXVhcmUgaW4gU1FVQVJFUykge1xuICAgICAgICB2YXIgc3FfMHg4OCA9IFNRVUFSRVNbc3F1YXJlXVxuICAgICAgICByZXR1cm4gKHJhbmsoc3FfMHg4OCkgKyBmaWxlKHNxXzB4ODgpKSAlIDIgPT09IDAgPyAnbGlnaHQnIDogJ2RhcmsnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsXG4gICAgfSxcblxuICAgIGhpc3Rvcnk6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICB2YXIgcmV2ZXJzZWRfaGlzdG9yeSA9IFtdXG4gICAgICB2YXIgbW92ZV9oaXN0b3J5ID0gW11cbiAgICAgIHZhciB2ZXJib3NlID1cbiAgICAgICAgdHlwZW9mIG9wdGlvbnMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICd2ZXJib3NlJyBpbiBvcHRpb25zICYmXG4gICAgICAgIG9wdGlvbnMudmVyYm9zZVxuXG4gICAgICB3aGlsZSAoaGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldmVyc2VkX2hpc3RvcnkucHVzaCh1bmRvX21vdmUoKSlcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHJldmVyc2VkX2hpc3RvcnkubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgbW92ZSA9IHJldmVyc2VkX2hpc3RvcnkucG9wKClcbiAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICBtb3ZlX2hpc3RvcnkucHVzaChtYWtlX3ByZXR0eShtb3ZlKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb3ZlX2hpc3RvcnkucHVzaChtb3ZlX3RvX3Nhbihtb3ZlLCBnZW5lcmF0ZV9tb3Zlcyh7IGxlZ2FsOiB0cnVlIH0pKSlcbiAgICAgICAgfVxuICAgICAgICBtYWtlX21vdmUobW92ZSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vdmVfaGlzdG9yeVxuICAgIH0sXG5cbiAgICBnZXRfY29tbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNvbW1lbnRzW2dlbmVyYXRlX2ZlbigpXVxuICAgIH0sXG5cbiAgICBzZXRfY29tbWVudDogZnVuY3Rpb24gKGNvbW1lbnQpIHtcbiAgICAgIGNvbW1lbnRzW2dlbmVyYXRlX2ZlbigpXSA9IGNvbW1lbnQucmVwbGFjZSgneycsICdbJykucmVwbGFjZSgnfScsICddJylcbiAgICB9LFxuXG4gICAgZGVsZXRlX2NvbW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb21tZW50ID0gY29tbWVudHNbZ2VuZXJhdGVfZmVuKCldXG4gICAgICBkZWxldGUgY29tbWVudHNbZ2VuZXJhdGVfZmVuKCldXG4gICAgICByZXR1cm4gY29tbWVudFxuICAgIH0sXG5cbiAgICBnZXRfY29tbWVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHBydW5lX2NvbW1lbnRzKClcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb21tZW50cykubWFwKGZ1bmN0aW9uIChmZW4pIHtcbiAgICAgICAgcmV0dXJuIHsgZmVuOiBmZW4sIGNvbW1lbnQ6IGNvbW1lbnRzW2Zlbl0gfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgZGVsZXRlX2NvbW1lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBwcnVuZV9jb21tZW50cygpXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29tbWVudHMpLm1hcChmdW5jdGlvbiAoZmVuKSB7XG4gICAgICAgIHZhciBjb21tZW50ID0gY29tbWVudHNbZmVuXVxuICAgICAgICBkZWxldGUgY29tbWVudHNbZmVuXVxuICAgICAgICByZXR1cm4geyBmZW46IGZlbiwgY29tbWVudDogY29tbWVudCB9XG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cblxuLyogZXhwb3J0IENoZXNzIG9iamVjdCBpZiB1c2luZyBub2RlIG9yIGFueSBvdGhlciBDb21tb25KUyBjb21wYXRpYmxlXG4gKiBlbnZpcm9ubWVudCAqL1xuaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykgZXhwb3J0cy5DaGVzcyA9IENoZXNzXG4vKiBleHBvcnQgQ2hlc3Mgb2JqZWN0IGZvciBhbnkgUmVxdWlyZUpTIGNvbXBhdGlibGUgZW52aXJvbm1lbnQgKi9cbmlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJylcbiAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQ2hlc3NcbiAgfSlcbiIsImV4cG9ydCBjb25zdCBjb2xvcnMgPSBbJ3doaXRlJywgJ2JsYWNrJ107XG5leHBvcnQgY29uc3QgZmlsZXMgPSBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnLCAnaCddO1xuZXhwb3J0IGNvbnN0IHJhbmtzID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsImltcG9ydCAqIGFzIGNnIGZyb20gJy4vdHlwZXMuanMnO1xuZXhwb3J0IGNvbnN0IGludlJhbmtzID0gWy4uLmNnLnJhbmtzXS5yZXZlcnNlKCk7XG5leHBvcnQgY29uc3QgYWxsS2V5cyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQoLi4uY2cuZmlsZXMubWFwKGMgPT4gY2cucmFua3MubWFwKHIgPT4gYyArIHIpKSk7XG5leHBvcnQgY29uc3QgcG9zMmtleSA9IChwb3MpID0+IGFsbEtleXNbOCAqIHBvc1swXSArIHBvc1sxXV07XG5leHBvcnQgY29uc3Qga2V5MnBvcyA9IChrKSA9PiBbay5jaGFyQ29kZUF0KDApIC0gOTcsIGsuY2hhckNvZGVBdCgxKSAtIDQ5XTtcbmV4cG9ydCBjb25zdCBhbGxQb3MgPSBhbGxLZXlzLm1hcChrZXkycG9zKTtcbmV4cG9ydCBmdW5jdGlvbiBtZW1vKGYpIHtcbiAgICBsZXQgdjtcbiAgICBjb25zdCByZXQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB2ID0gZigpO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9O1xuICAgIHJldC5jbGVhciA9ICgpID0+IHtcbiAgICAgICAgdiA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiByZXQ7XG59XG5leHBvcnQgY29uc3QgdGltZXIgPSAoKSA9PiB7XG4gICAgbGV0IHN0YXJ0QXQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgICBzdGFydEF0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHN0YXJ0QXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHN0b3AoKSB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0QXQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydEF0O1xuICAgICAgICAgICAgc3RhcnRBdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xuICAgICAgICB9LFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IG9wcG9zaXRlID0gKGMpID0+IChjID09PSAnd2hpdGUnID8gJ2JsYWNrJyA6ICd3aGl0ZScpO1xuZXhwb3J0IGNvbnN0IGRpc3RhbmNlU3EgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIGNvbnN0IGR4ID0gcG9zMVswXSAtIHBvczJbMF0sIGR5ID0gcG9zMVsxXSAtIHBvczJbMV07XG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufTtcbmV4cG9ydCBjb25zdCBzYW1lUGllY2UgPSAocDEsIHAyKSA9PiBwMS5yb2xlID09PSBwMi5yb2xlICYmIHAxLmNvbG9yID09PSBwMi5jb2xvcjtcbmV4cG9ydCBjb25zdCBwb3NUb1RyYW5zbGF0ZSA9IChib3VuZHMpID0+IChwb3MsIGFzV2hpdGUpID0+IFsoKGFzV2hpdGUgPyBwb3NbMF0gOiA3IC0gcG9zWzBdKSAqIGJvdW5kcy53aWR0aCkgLyA4LCAoKGFzV2hpdGUgPyA3IC0gcG9zWzFdIDogcG9zWzFdKSAqIGJvdW5kcy5oZWlnaHQpIC8gOF07XG5leHBvcnQgY29uc3QgdHJhbnNsYXRlID0gKGVsLCBwb3MpID0+IHtcbiAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7cG9zWzBdfXB4LCR7cG9zWzFdfXB4KWA7XG59O1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUFuZFNjYWxlID0gKGVsLCBwb3MsIHNjYWxlID0gMSkgPT4ge1xuICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtwb3NbMF19cHgsJHtwb3NbMV19cHgpIHNjYWxlKCR7c2NhbGV9KWA7XG59O1xuZXhwb3J0IGNvbnN0IHNldFZpc2libGUgPSAoZWwsIHYpID0+IHtcbiAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gdiA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xufTtcbmV4cG9ydCBjb25zdCBldmVudFBvc2l0aW9uID0gKGUpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKGUuY2xpZW50WCB8fCBlLmNsaWVudFggPT09IDApXG4gICAgICAgIHJldHVybiBbZS5jbGllbnRYLCBlLmNsaWVudFldO1xuICAgIGlmICgoX2EgPSBlLnRhcmdldFRvdWNoZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXSlcbiAgICAgICAgcmV0dXJuIFtlLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WCwgZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFldO1xuICAgIHJldHVybjsgLy8gdG91Y2hlbmQgaGFzIG5vIHBvc2l0aW9uIVxufTtcbmV4cG9ydCBjb25zdCBpc1JpZ2h0QnV0dG9uID0gKGUpID0+IGUuYnV0dG9ucyA9PT0gMiB8fCBlLmJ1dHRvbiA9PT0gMjtcbmV4cG9ydCBjb25zdCBjcmVhdGVFbCA9ICh0YWdOYW1lLCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgaWYgKGNsYXNzTmFtZSlcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIHJldHVybiBlbDtcbn07XG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNxdWFyZUNlbnRlcihrZXksIGFzV2hpdGUsIGJvdW5kcykge1xuICAgIGNvbnN0IHBvcyA9IGtleTJwb3Moa2V5KTtcbiAgICBpZiAoIWFzV2hpdGUpIHtcbiAgICAgICAgcG9zWzBdID0gNyAtIHBvc1swXTtcbiAgICAgICAgcG9zWzFdID0gNyAtIHBvc1sxXTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYm91bmRzLmxlZnQgKyAoYm91bmRzLndpZHRoICogcG9zWzBdKSAvIDggKyBib3VuZHMud2lkdGggLyAxNixcbiAgICAgICAgYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0ICogKDcgLSBwb3NbMV0pKSAvIDggKyBib3VuZHMuaGVpZ2h0IC8gMTYsXG4gICAgXTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuZnVuY3Rpb24gZGlmZihhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbn1cbmZ1bmN0aW9uIHBhd24oY29sb3IpIHtcbiAgICByZXR1cm4gKHgxLCB5MSwgeDIsIHkyKSA9PiBkaWZmKHgxLCB4MikgPCAyICYmXG4gICAgICAgIChjb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgPyAvLyBhbGxvdyAyIHNxdWFyZXMgZnJvbSBmaXJzdCB0d28gcmFua3MsIGZvciBob3JkZVxuICAgICAgICAgICAgICAgIHkyID09PSB5MSArIDEgfHwgKHkxIDw9IDEgJiYgeTIgPT09IHkxICsgMiAmJiB4MSA9PT0geDIpXG4gICAgICAgICAgICA6IHkyID09PSB5MSAtIDEgfHwgKHkxID49IDYgJiYgeTIgPT09IHkxIC0gMiAmJiB4MSA9PT0geDIpKTtcbn1cbmV4cG9ydCBjb25zdCBrbmlnaHQgPSAoeDEsIHkxLCB4MiwgeTIpID0+IHtcbiAgICBjb25zdCB4ZCA9IGRpZmYoeDEsIHgyKTtcbiAgICBjb25zdCB5ZCA9IGRpZmYoeTEsIHkyKTtcbiAgICByZXR1cm4gKHhkID09PSAxICYmIHlkID09PSAyKSB8fCAoeGQgPT09IDIgJiYgeWQgPT09IDEpO1xufTtcbmNvbnN0IGJpc2hvcCA9ICh4MSwgeTEsIHgyLCB5MikgPT4ge1xuICAgIHJldHVybiBkaWZmKHgxLCB4MikgPT09IGRpZmYoeTEsIHkyKTtcbn07XG5jb25zdCByb29rID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB7XG4gICAgcmV0dXJuIHgxID09PSB4MiB8fCB5MSA9PT0geTI7XG59O1xuZXhwb3J0IGNvbnN0IHF1ZWVuID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB7XG4gICAgcmV0dXJuIGJpc2hvcCh4MSwgeTEsIHgyLCB5MikgfHwgcm9vayh4MSwgeTEsIHgyLCB5Mik7XG59O1xuZnVuY3Rpb24ga2luZyhjb2xvciwgcm9va0ZpbGVzLCBjYW5DYXN0bGUpIHtcbiAgICByZXR1cm4gKHgxLCB5MSwgeDIsIHkyKSA9PiAoZGlmZih4MSwgeDIpIDwgMiAmJiBkaWZmKHkxLCB5MikgPCAyKSB8fFxuICAgICAgICAoY2FuQ2FzdGxlICYmXG4gICAgICAgICAgICB5MSA9PT0geTIgJiZcbiAgICAgICAgICAgIHkxID09PSAoY29sb3IgPT09ICd3aGl0ZScgPyAwIDogNykgJiZcbiAgICAgICAgICAgICgoeDEgPT09IDQgJiYgKCh4MiA9PT0gMiAmJiByb29rRmlsZXMuaW5jbHVkZXMoMCkpIHx8ICh4MiA9PT0gNiAmJiByb29rRmlsZXMuaW5jbHVkZXMoNykpKSkgfHxcbiAgICAgICAgICAgICAgICByb29rRmlsZXMuaW5jbHVkZXMoeDIpKSk7XG59XG5mdW5jdGlvbiByb29rRmlsZXNPZihwaWVjZXMsIGNvbG9yKSB7XG4gICAgY29uc3QgYmFja3JhbmsgPSBjb2xvciA9PT0gJ3doaXRlJyA/ICcxJyA6ICc4JztcbiAgICBjb25zdCBmaWxlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgW2tleSwgcGllY2VdIG9mIHBpZWNlcykge1xuICAgICAgICBpZiAoa2V5WzFdID09PSBiYWNrcmFuayAmJiBwaWVjZS5jb2xvciA9PT0gY29sb3IgJiYgcGllY2Uucm9sZSA9PT0gJ3Jvb2snKSB7XG4gICAgICAgICAgICBmaWxlcy5wdXNoKHV0aWwua2V5MnBvcyhrZXkpWzBdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gcHJlbW92ZShwaWVjZXMsIGtleSwgY2FuQ2FzdGxlKSB7XG4gICAgY29uc3QgcGllY2UgPSBwaWVjZXMuZ2V0KGtleSk7XG4gICAgaWYgKCFwaWVjZSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGNvbnN0IHBvcyA9IHV0aWwua2V5MnBvcyhrZXkpLCByID0gcGllY2Uucm9sZSwgbW9iaWxpdHkgPSByID09PSAncGF3bidcbiAgICAgICAgPyBwYXduKHBpZWNlLmNvbG9yKVxuICAgICAgICA6IHIgPT09ICdrbmlnaHQnXG4gICAgICAgICAgICA/IGtuaWdodFxuICAgICAgICAgICAgOiByID09PSAnYmlzaG9wJ1xuICAgICAgICAgICAgICAgID8gYmlzaG9wXG4gICAgICAgICAgICAgICAgOiByID09PSAncm9vaydcbiAgICAgICAgICAgICAgICAgICAgPyByb29rXG4gICAgICAgICAgICAgICAgICAgIDogciA9PT0gJ3F1ZWVuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBxdWVlblxuICAgICAgICAgICAgICAgICAgICAgICAgOiBraW5nKHBpZWNlLmNvbG9yLCByb29rRmlsZXNPZihwaWVjZXMsIHBpZWNlLmNvbG9yKSwgY2FuQ2FzdGxlKTtcbiAgICByZXR1cm4gdXRpbC5hbGxQb3NcbiAgICAgICAgLmZpbHRlcihwb3MyID0+IChwb3NbMF0gIT09IHBvczJbMF0gfHwgcG9zWzFdICE9PSBwb3MyWzFdKSAmJiBtb2JpbGl0eShwb3NbMF0sIHBvc1sxXSwgcG9zMlswXSwgcG9zMlsxXSkpXG4gICAgICAgIC5tYXAodXRpbC5wb3Mya2V5KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZW1vdmUuanMubWFwIiwiaW1wb3J0IHsgcG9zMmtleSwga2V5MnBvcywgb3Bwb3NpdGUsIGRpc3RhbmNlU3EsIGFsbFBvcywgY29tcHV0ZVNxdWFyZUNlbnRlciB9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgeyBwcmVtb3ZlLCBxdWVlbiwga25pZ2h0IH0gZnJvbSAnLi9wcmVtb3ZlLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBjYWxsVXNlckZ1bmN0aW9uKGYsIC4uLmFyZ3MpIHtcbiAgICBpZiAoZilcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmKC4uLmFyZ3MpLCAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVPcmllbnRhdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlLm9yaWVudGF0aW9uID0gb3Bwb3NpdGUoc3RhdGUub3JpZW50YXRpb24pO1xuICAgIHN0YXRlLmFuaW1hdGlvbi5jdXJyZW50ID0gc3RhdGUuZHJhZ2dhYmxlLmN1cnJlbnQgPSBzdGF0ZS5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXNldChzdGF0ZSkge1xuICAgIHN0YXRlLmxhc3RNb3ZlID0gdW5kZWZpbmVkO1xuICAgIHVuc2VsZWN0KHN0YXRlKTtcbiAgICB1bnNldFByZW1vdmUoc3RhdGUpO1xuICAgIHVuc2V0UHJlZHJvcChzdGF0ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0UGllY2VzKHN0YXRlLCBwaWVjZXMpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHBpZWNlXSBvZiBwaWVjZXMpIHtcbiAgICAgICAgaWYgKHBpZWNlKVxuICAgICAgICAgICAgc3RhdGUucGllY2VzLnNldChrZXksIHBpZWNlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RhdGUucGllY2VzLmRlbGV0ZShrZXkpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRDaGVjayhzdGF0ZSwgY29sb3IpIHtcbiAgICBzdGF0ZS5jaGVjayA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY29sb3IgPT09IHRydWUpXG4gICAgICAgIGNvbG9yID0gc3RhdGUudHVybkNvbG9yO1xuICAgIGlmIChjb2xvcilcbiAgICAgICAgZm9yIChjb25zdCBbaywgcF0gb2Ygc3RhdGUucGllY2VzKSB7XG4gICAgICAgICAgICBpZiAocC5yb2xlID09PSAna2luZycgJiYgcC5jb2xvciA9PT0gY29sb3IpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5jaGVjayA9IGs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn1cbmZ1bmN0aW9uIHNldFByZW1vdmUoc3RhdGUsIG9yaWcsIGRlc3QsIG1ldGEpIHtcbiAgICB1bnNldFByZWRyb3Aoc3RhdGUpO1xuICAgIHN0YXRlLnByZW1vdmFibGUuY3VycmVudCA9IFtvcmlnLCBkZXN0XTtcbiAgICBjYWxsVXNlckZ1bmN0aW9uKHN0YXRlLnByZW1vdmFibGUuZXZlbnRzLnNldCwgb3JpZywgZGVzdCwgbWV0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdW5zZXRQcmVtb3ZlKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLnByZW1vdmFibGUuY3VycmVudCkge1xuICAgICAgICBzdGF0ZS5wcmVtb3ZhYmxlLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxVc2VyRnVuY3Rpb24oc3RhdGUucHJlbW92YWJsZS5ldmVudHMudW5zZXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldFByZWRyb3Aoc3RhdGUsIHJvbGUsIGtleSkge1xuICAgIHVuc2V0UHJlbW92ZShzdGF0ZSk7XG4gICAgc3RhdGUucHJlZHJvcHBhYmxlLmN1cnJlbnQgPSB7IHJvbGUsIGtleSB9O1xuICAgIGNhbGxVc2VyRnVuY3Rpb24oc3RhdGUucHJlZHJvcHBhYmxlLmV2ZW50cy5zZXQsIHJvbGUsIGtleSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdW5zZXRQcmVkcm9wKHN0YXRlKSB7XG4gICAgY29uc3QgcGQgPSBzdGF0ZS5wcmVkcm9wcGFibGU7XG4gICAgaWYgKHBkLmN1cnJlbnQpIHtcbiAgICAgICAgcGQuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY2FsbFVzZXJGdW5jdGlvbihwZC5ldmVudHMudW5zZXQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyeUF1dG9DYXN0bGUoc3RhdGUsIG9yaWcsIGRlc3QpIHtcbiAgICBpZiAoIXN0YXRlLmF1dG9DYXN0bGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBraW5nID0gc3RhdGUucGllY2VzLmdldChvcmlnKTtcbiAgICBpZiAoIWtpbmcgfHwga2luZy5yb2xlICE9PSAna2luZycpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBvcmlnUG9zID0ga2V5MnBvcyhvcmlnKTtcbiAgICBjb25zdCBkZXN0UG9zID0ga2V5MnBvcyhkZXN0KTtcbiAgICBpZiAoKG9yaWdQb3NbMV0gIT09IDAgJiYgb3JpZ1Bvc1sxXSAhPT0gNykgfHwgb3JpZ1Bvc1sxXSAhPT0gZGVzdFBvc1sxXSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvcmlnUG9zWzBdID09PSA0ICYmICFzdGF0ZS5waWVjZXMuaGFzKGRlc3QpKSB7XG4gICAgICAgIGlmIChkZXN0UG9zWzBdID09PSA2KVxuICAgICAgICAgICAgZGVzdCA9IHBvczJrZXkoWzcsIGRlc3RQb3NbMV1dKTtcbiAgICAgICAgZWxzZSBpZiAoZGVzdFBvc1swXSA9PT0gMilcbiAgICAgICAgICAgIGRlc3QgPSBwb3Mya2V5KFswLCBkZXN0UG9zWzFdXSk7XG4gICAgfVxuICAgIGNvbnN0IHJvb2sgPSBzdGF0ZS5waWVjZXMuZ2V0KGRlc3QpO1xuICAgIGlmICghcm9vayB8fCByb29rLmNvbG9yICE9PSBraW5nLmNvbG9yIHx8IHJvb2sucm9sZSAhPT0gJ3Jvb2snKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgc3RhdGUucGllY2VzLmRlbGV0ZShvcmlnKTtcbiAgICBzdGF0ZS5waWVjZXMuZGVsZXRlKGRlc3QpO1xuICAgIGlmIChvcmlnUG9zWzBdIDwgZGVzdFBvc1swXSkge1xuICAgICAgICBzdGF0ZS5waWVjZXMuc2V0KHBvczJrZXkoWzYsIGRlc3RQb3NbMV1dKSwga2luZyk7XG4gICAgICAgIHN0YXRlLnBpZWNlcy5zZXQocG9zMmtleShbNSwgZGVzdFBvc1sxXV0pLCByb29rKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLnBpZWNlcy5zZXQocG9zMmtleShbMiwgZGVzdFBvc1sxXV0pLCBraW5nKTtcbiAgICAgICAgc3RhdGUucGllY2VzLnNldChwb3Mya2V5KFszLCBkZXN0UG9zWzFdXSksIHJvb2spO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYXNlTW92ZShzdGF0ZSwgb3JpZywgZGVzdCkge1xuICAgIGNvbnN0IG9yaWdQaWVjZSA9IHN0YXRlLnBpZWNlcy5nZXQob3JpZyksIGRlc3RQaWVjZSA9IHN0YXRlLnBpZWNlcy5nZXQoZGVzdCk7XG4gICAgaWYgKG9yaWcgPT09IGRlc3QgfHwgIW9yaWdQaWVjZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGNhcHR1cmVkID0gZGVzdFBpZWNlICYmIGRlc3RQaWVjZS5jb2xvciAhPT0gb3JpZ1BpZWNlLmNvbG9yID8gZGVzdFBpZWNlIDogdW5kZWZpbmVkO1xuICAgIGlmIChkZXN0ID09PSBzdGF0ZS5zZWxlY3RlZClcbiAgICAgICAgdW5zZWxlY3Qoc3RhdGUpO1xuICAgIGNhbGxVc2VyRnVuY3Rpb24oc3RhdGUuZXZlbnRzLm1vdmUsIG9yaWcsIGRlc3QsIGNhcHR1cmVkKTtcbiAgICBpZiAoIXRyeUF1dG9DYXN0bGUoc3RhdGUsIG9yaWcsIGRlc3QpKSB7XG4gICAgICAgIHN0YXRlLnBpZWNlcy5zZXQoZGVzdCwgb3JpZ1BpZWNlKTtcbiAgICAgICAgc3RhdGUucGllY2VzLmRlbGV0ZShvcmlnKTtcbiAgICB9XG4gICAgc3RhdGUubGFzdE1vdmUgPSBbb3JpZywgZGVzdF07XG4gICAgc3RhdGUuY2hlY2sgPSB1bmRlZmluZWQ7XG4gICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5ldmVudHMuY2hhbmdlKTtcbiAgICByZXR1cm4gY2FwdHVyZWQgfHwgdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYXNlTmV3UGllY2Uoc3RhdGUsIHBpZWNlLCBrZXksIGZvcmNlKSB7XG4gICAgaWYgKHN0YXRlLnBpZWNlcy5oYXMoa2V5KSkge1xuICAgICAgICBpZiAoZm9yY2UpXG4gICAgICAgICAgICBzdGF0ZS5waWVjZXMuZGVsZXRlKGtleSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5ldmVudHMuZHJvcE5ld1BpZWNlLCBwaWVjZSwga2V5KTtcbiAgICBzdGF0ZS5waWVjZXMuc2V0KGtleSwgcGllY2UpO1xuICAgIHN0YXRlLmxhc3RNb3ZlID0gW2tleV07XG4gICAgc3RhdGUuY2hlY2sgPSB1bmRlZmluZWQ7XG4gICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5ldmVudHMuY2hhbmdlKTtcbiAgICBzdGF0ZS5tb3ZhYmxlLmRlc3RzID0gdW5kZWZpbmVkO1xuICAgIHN0YXRlLnR1cm5Db2xvciA9IG9wcG9zaXRlKHN0YXRlLnR1cm5Db2xvcik7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBiYXNlVXNlck1vdmUoc3RhdGUsIG9yaWcsIGRlc3QpIHtcbiAgICBjb25zdCByZXN1bHQgPSBiYXNlTW92ZShzdGF0ZSwgb3JpZywgZGVzdCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBzdGF0ZS5tb3ZhYmxlLmRlc3RzID0gdW5kZWZpbmVkO1xuICAgICAgICBzdGF0ZS50dXJuQ29sb3IgPSBvcHBvc2l0ZShzdGF0ZS50dXJuQ29sb3IpO1xuICAgICAgICBzdGF0ZS5hbmltYXRpb24uY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VyTW92ZShzdGF0ZSwgb3JpZywgZGVzdCkge1xuICAgIGlmIChjYW5Nb3ZlKHN0YXRlLCBvcmlnLCBkZXN0KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBiYXNlVXNlck1vdmUoc3RhdGUsIG9yaWcsIGRlc3QpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBob2xkVGltZSA9IHN0YXRlLmhvbGQuc3RvcCgpO1xuICAgICAgICAgICAgdW5zZWxlY3Qoc3RhdGUpO1xuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgcHJlbW92ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY3RybEtleTogc3RhdGUuc3RhdHMuY3RybEtleSxcbiAgICAgICAgICAgICAgICBob2xkVGltZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKVxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmNhcHR1cmVkID0gcmVzdWx0O1xuICAgICAgICAgICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5tb3ZhYmxlLmV2ZW50cy5hZnRlciwgb3JpZywgZGVzdCwgbWV0YWRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoY2FuUHJlbW92ZShzdGF0ZSwgb3JpZywgZGVzdCkpIHtcbiAgICAgICAgc2V0UHJlbW92ZShzdGF0ZSwgb3JpZywgZGVzdCwge1xuICAgICAgICAgICAgY3RybEtleTogc3RhdGUuc3RhdHMuY3RybEtleSxcbiAgICAgICAgfSk7XG4gICAgICAgIHVuc2VsZWN0KHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHVuc2VsZWN0KHN0YXRlKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJvcE5ld1BpZWNlKHN0YXRlLCBvcmlnLCBkZXN0LCBmb3JjZSkge1xuICAgIGNvbnN0IHBpZWNlID0gc3RhdGUucGllY2VzLmdldChvcmlnKTtcbiAgICBpZiAocGllY2UgJiYgKGNhbkRyb3Aoc3RhdGUsIG9yaWcsIGRlc3QpIHx8IGZvcmNlKSkge1xuICAgICAgICBzdGF0ZS5waWVjZXMuZGVsZXRlKG9yaWcpO1xuICAgICAgICBiYXNlTmV3UGllY2Uoc3RhdGUsIHBpZWNlLCBkZXN0LCBmb3JjZSk7XG4gICAgICAgIGNhbGxVc2VyRnVuY3Rpb24oc3RhdGUubW92YWJsZS5ldmVudHMuYWZ0ZXJOZXdQaWVjZSwgcGllY2Uucm9sZSwgZGVzdCwge1xuICAgICAgICAgICAgcHJlbW92ZTogZmFsc2UsXG4gICAgICAgICAgICBwcmVkcm9wOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBpZWNlICYmIGNhblByZWRyb3Aoc3RhdGUsIG9yaWcsIGRlc3QpKSB7XG4gICAgICAgIHNldFByZWRyb3Aoc3RhdGUsIHBpZWNlLnJvbGUsIGRlc3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdW5zZXRQcmVtb3ZlKHN0YXRlKTtcbiAgICAgICAgdW5zZXRQcmVkcm9wKHN0YXRlKTtcbiAgICB9XG4gICAgc3RhdGUucGllY2VzLmRlbGV0ZShvcmlnKTtcbiAgICB1bnNlbGVjdChzdGF0ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0U3F1YXJlKHN0YXRlLCBrZXksIGZvcmNlKSB7XG4gICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5ldmVudHMuc2VsZWN0LCBrZXkpO1xuICAgIGlmIChzdGF0ZS5zZWxlY3RlZCkge1xuICAgICAgICBpZiAoc3RhdGUuc2VsZWN0ZWQgPT09IGtleSAmJiAhc3RhdGUuZHJhZ2dhYmxlLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHVuc2VsZWN0KHN0YXRlKTtcbiAgICAgICAgICAgIHN0YXRlLmhvbGQuY2FuY2VsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKHN0YXRlLnNlbGVjdGFibGUuZW5hYmxlZCB8fCBmb3JjZSkgJiYgc3RhdGUuc2VsZWN0ZWQgIT09IGtleSkge1xuICAgICAgICAgICAgaWYgKHVzZXJNb3ZlKHN0YXRlLCBzdGF0ZS5zZWxlY3RlZCwga2V5KSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLnN0YXRzLmRyYWdnZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzTW92YWJsZShzdGF0ZSwga2V5KSB8fCBpc1ByZW1vdmFibGUoc3RhdGUsIGtleSkpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWQoc3RhdGUsIGtleSk7XG4gICAgICAgIHN0YXRlLmhvbGQuc3RhcnQoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0U2VsZWN0ZWQoc3RhdGUsIGtleSkge1xuICAgIHN0YXRlLnNlbGVjdGVkID0ga2V5O1xuICAgIGlmIChpc1ByZW1vdmFibGUoc3RhdGUsIGtleSkpIHtcbiAgICAgICAgc3RhdGUucHJlbW92YWJsZS5kZXN0cyA9IHByZW1vdmUoc3RhdGUucGllY2VzLCBrZXksIHN0YXRlLnByZW1vdmFibGUuY2FzdGxlKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBzdGF0ZS5wcmVtb3ZhYmxlLmRlc3RzID0gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVuc2VsZWN0KHN0YXRlKSB7XG4gICAgc3RhdGUuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XG4gICAgc3RhdGUucHJlbW92YWJsZS5kZXN0cyA9IHVuZGVmaW5lZDtcbiAgICBzdGF0ZS5ob2xkLmNhbmNlbCgpO1xufVxuZnVuY3Rpb24gaXNNb3ZhYmxlKHN0YXRlLCBvcmlnKSB7XG4gICAgY29uc3QgcGllY2UgPSBzdGF0ZS5waWVjZXMuZ2V0KG9yaWcpO1xuICAgIHJldHVybiAoISFwaWVjZSAmJlxuICAgICAgICAoc3RhdGUubW92YWJsZS5jb2xvciA9PT0gJ2JvdGgnIHx8IChzdGF0ZS5tb3ZhYmxlLmNvbG9yID09PSBwaWVjZS5jb2xvciAmJiBzdGF0ZS50dXJuQ29sb3IgPT09IHBpZWNlLmNvbG9yKSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbk1vdmUoc3RhdGUsIG9yaWcsIGRlc3QpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIHJldHVybiAob3JpZyAhPT0gZGVzdCAmJiBpc01vdmFibGUoc3RhdGUsIG9yaWcpICYmIChzdGF0ZS5tb3ZhYmxlLmZyZWUgfHwgISEoKF9iID0gKF9hID0gc3RhdGUubW92YWJsZS5kZXN0cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldChvcmlnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmluY2x1ZGVzKGRlc3QpKSkpO1xufVxuZnVuY3Rpb24gY2FuRHJvcChzdGF0ZSwgb3JpZywgZGVzdCkge1xuICAgIGNvbnN0IHBpZWNlID0gc3RhdGUucGllY2VzLmdldChvcmlnKTtcbiAgICByZXR1cm4gKCEhcGllY2UgJiZcbiAgICAgICAgKG9yaWcgPT09IGRlc3QgfHwgIXN0YXRlLnBpZWNlcy5oYXMoZGVzdCkpICYmXG4gICAgICAgIChzdGF0ZS5tb3ZhYmxlLmNvbG9yID09PSAnYm90aCcgfHwgKHN0YXRlLm1vdmFibGUuY29sb3IgPT09IHBpZWNlLmNvbG9yICYmIHN0YXRlLnR1cm5Db2xvciA9PT0gcGllY2UuY29sb3IpKSk7XG59XG5mdW5jdGlvbiBpc1ByZW1vdmFibGUoc3RhdGUsIG9yaWcpIHtcbiAgICBjb25zdCBwaWVjZSA9IHN0YXRlLnBpZWNlcy5nZXQob3JpZyk7XG4gICAgcmV0dXJuICEhcGllY2UgJiYgc3RhdGUucHJlbW92YWJsZS5lbmFibGVkICYmIHN0YXRlLm1vdmFibGUuY29sb3IgPT09IHBpZWNlLmNvbG9yICYmIHN0YXRlLnR1cm5Db2xvciAhPT0gcGllY2UuY29sb3I7XG59XG5mdW5jdGlvbiBjYW5QcmVtb3ZlKHN0YXRlLCBvcmlnLCBkZXN0KSB7XG4gICAgcmV0dXJuIChvcmlnICE9PSBkZXN0ICYmIGlzUHJlbW92YWJsZShzdGF0ZSwgb3JpZykgJiYgcHJlbW92ZShzdGF0ZS5waWVjZXMsIG9yaWcsIHN0YXRlLnByZW1vdmFibGUuY2FzdGxlKS5pbmNsdWRlcyhkZXN0KSk7XG59XG5mdW5jdGlvbiBjYW5QcmVkcm9wKHN0YXRlLCBvcmlnLCBkZXN0KSB7XG4gICAgY29uc3QgcGllY2UgPSBzdGF0ZS5waWVjZXMuZ2V0KG9yaWcpO1xuICAgIGNvbnN0IGRlc3RQaWVjZSA9IHN0YXRlLnBpZWNlcy5nZXQoZGVzdCk7XG4gICAgcmV0dXJuICghIXBpZWNlICYmXG4gICAgICAgICghZGVzdFBpZWNlIHx8IGRlc3RQaWVjZS5jb2xvciAhPT0gc3RhdGUubW92YWJsZS5jb2xvcikgJiZcbiAgICAgICAgc3RhdGUucHJlZHJvcHBhYmxlLmVuYWJsZWQgJiZcbiAgICAgICAgKHBpZWNlLnJvbGUgIT09ICdwYXduJyB8fCAoZGVzdFsxXSAhPT0gJzEnICYmIGRlc3RbMV0gIT09ICc4JykpICYmXG4gICAgICAgIHN0YXRlLm1vdmFibGUuY29sb3IgPT09IHBpZWNlLmNvbG9yICYmXG4gICAgICAgIHN0YXRlLnR1cm5Db2xvciAhPT0gcGllY2UuY29sb3IpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRHJhZ2dhYmxlKHN0YXRlLCBvcmlnKSB7XG4gICAgY29uc3QgcGllY2UgPSBzdGF0ZS5waWVjZXMuZ2V0KG9yaWcpO1xuICAgIHJldHVybiAoISFwaWVjZSAmJlxuICAgICAgICBzdGF0ZS5kcmFnZ2FibGUuZW5hYmxlZCAmJlxuICAgICAgICAoc3RhdGUubW92YWJsZS5jb2xvciA9PT0gJ2JvdGgnIHx8XG4gICAgICAgICAgICAoc3RhdGUubW92YWJsZS5jb2xvciA9PT0gcGllY2UuY29sb3IgJiYgKHN0YXRlLnR1cm5Db2xvciA9PT0gcGllY2UuY29sb3IgfHwgc3RhdGUucHJlbW92YWJsZS5lbmFibGVkKSkpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwbGF5UHJlbW92ZShzdGF0ZSkge1xuICAgIGNvbnN0IG1vdmUgPSBzdGF0ZS5wcmVtb3ZhYmxlLmN1cnJlbnQ7XG4gICAgaWYgKCFtb3ZlKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3Qgb3JpZyA9IG1vdmVbMF0sIGRlc3QgPSBtb3ZlWzFdO1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgaWYgKGNhbk1vdmUoc3RhdGUsIG9yaWcsIGRlc3QpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhc2VVc2VyTW92ZShzdGF0ZSwgb3JpZywgZGVzdCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0geyBwcmVtb3ZlOiB0cnVlIH07XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKVxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmNhcHR1cmVkID0gcmVzdWx0O1xuICAgICAgICAgICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5tb3ZhYmxlLmV2ZW50cy5hZnRlciwgb3JpZywgZGVzdCwgbWV0YWRhdGEpO1xuICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zZXRQcmVtb3ZlKHN0YXRlKTtcbiAgICByZXR1cm4gc3VjY2Vzcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBwbGF5UHJlZHJvcChzdGF0ZSwgdmFsaWRhdGUpIHtcbiAgICBjb25zdCBkcm9wID0gc3RhdGUucHJlZHJvcHBhYmxlLmN1cnJlbnQ7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICBpZiAoIWRyb3ApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAodmFsaWRhdGUoZHJvcCkpIHtcbiAgICAgICAgY29uc3QgcGllY2UgPSB7XG4gICAgICAgICAgICByb2xlOiBkcm9wLnJvbGUsXG4gICAgICAgICAgICBjb2xvcjogc3RhdGUubW92YWJsZS5jb2xvcixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGJhc2VOZXdQaWVjZShzdGF0ZSwgcGllY2UsIGRyb3Aua2V5KSkge1xuICAgICAgICAgICAgY2FsbFVzZXJGdW5jdGlvbihzdGF0ZS5tb3ZhYmxlLmV2ZW50cy5hZnRlck5ld1BpZWNlLCBkcm9wLnJvbGUsIGRyb3Aua2V5LCB7XG4gICAgICAgICAgICAgICAgcHJlbW92ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJlZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zZXRQcmVkcm9wKHN0YXRlKTtcbiAgICByZXR1cm4gc3VjY2Vzcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxNb3ZlKHN0YXRlKSB7XG4gICAgdW5zZXRQcmVtb3ZlKHN0YXRlKTtcbiAgICB1bnNldFByZWRyb3Aoc3RhdGUpO1xuICAgIHVuc2VsZWN0KHN0YXRlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdG9wKHN0YXRlKSB7XG4gICAgc3RhdGUubW92YWJsZS5jb2xvciA9IHN0YXRlLm1vdmFibGUuZGVzdHMgPSBzdGF0ZS5hbmltYXRpb24uY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICBjYW5jZWxNb3ZlKHN0YXRlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXlBdERvbVBvcyhwb3MsIGFzV2hpdGUsIGJvdW5kcykge1xuICAgIGxldCBmaWxlID0gTWF0aC5mbG9vcigoOCAqIChwb3NbMF0gLSBib3VuZHMubGVmdCkpIC8gYm91bmRzLndpZHRoKTtcbiAgICBpZiAoIWFzV2hpdGUpXG4gICAgICAgIGZpbGUgPSA3IC0gZmlsZTtcbiAgICBsZXQgcmFuayA9IDcgLSBNYXRoLmZsb29yKCg4ICogKHBvc1sxXSAtIGJvdW5kcy50b3ApKSAvIGJvdW5kcy5oZWlnaHQpO1xuICAgIGlmICghYXNXaGl0ZSlcbiAgICAgICAgcmFuayA9IDcgLSByYW5rO1xuICAgIHJldHVybiBmaWxlID49IDAgJiYgZmlsZSA8IDggJiYgcmFuayA+PSAwICYmIHJhbmsgPCA4ID8gcG9zMmtleShbZmlsZSwgcmFua10pIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNuYXBwZWRLZXlBdERvbVBvcyhvcmlnLCBwb3MsIGFzV2hpdGUsIGJvdW5kcykge1xuICAgIGNvbnN0IG9yaWdQb3MgPSBrZXkycG9zKG9yaWcpO1xuICAgIGNvbnN0IHZhbGlkU25hcFBvcyA9IGFsbFBvcy5maWx0ZXIocG9zMiA9PiB7XG4gICAgICAgIHJldHVybiBxdWVlbihvcmlnUG9zWzBdLCBvcmlnUG9zWzFdLCBwb3MyWzBdLCBwb3MyWzFdKSB8fCBrbmlnaHQob3JpZ1Bvc1swXSwgb3JpZ1Bvc1sxXSwgcG9zMlswXSwgcG9zMlsxXSk7XG4gICAgfSk7XG4gICAgY29uc3QgdmFsaWRTbmFwQ2VudGVycyA9IHZhbGlkU25hcFBvcy5tYXAocG9zMiA9PiBjb21wdXRlU3F1YXJlQ2VudGVyKHBvczJrZXkocG9zMiksIGFzV2hpdGUsIGJvdW5kcykpO1xuICAgIGNvbnN0IHZhbGlkU25hcERpc3RhbmNlcyA9IHZhbGlkU25hcENlbnRlcnMubWFwKHBvczIgPT4gZGlzdGFuY2VTcShwb3MsIHBvczIpKTtcbiAgICBjb25zdCBbLCBjbG9zZXN0U25hcEluZGV4XSA9IHZhbGlkU25hcERpc3RhbmNlcy5yZWR1Y2UoKGEsIGIsIGluZGV4KSA9PiAoYVswXSA8IGIgPyBhIDogW2IsIGluZGV4XSksIFt2YWxpZFNuYXBEaXN0YW5jZXNbMF0sIDBdKTtcbiAgICByZXR1cm4gcG9zMmtleSh2YWxpZFNuYXBQb3NbY2xvc2VzdFNuYXBJbmRleF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdoaXRlUG92KHMpIHtcbiAgICByZXR1cm4gcy5vcmllbnRhdGlvbiA9PT0gJ3doaXRlJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvYXJkLmpzLm1hcCIsImltcG9ydCB7IHBvczJrZXksIGludlJhbmtzIH0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCAqIGFzIGNnIGZyb20gJy4vdHlwZXMuanMnO1xuZXhwb3J0IGNvbnN0IGluaXRpYWwgPSAncm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUic7XG5jb25zdCByb2xlcyA9IHtcbiAgICBwOiAncGF3bicsXG4gICAgcjogJ3Jvb2snLFxuICAgIG46ICdrbmlnaHQnLFxuICAgIGI6ICdiaXNob3AnLFxuICAgIHE6ICdxdWVlbicsXG4gICAgazogJ2tpbmcnLFxufTtcbmNvbnN0IGxldHRlcnMgPSB7XG4gICAgcGF3bjogJ3AnLFxuICAgIHJvb2s6ICdyJyxcbiAgICBrbmlnaHQ6ICduJyxcbiAgICBiaXNob3A6ICdiJyxcbiAgICBxdWVlbjogJ3EnLFxuICAgIGtpbmc6ICdrJyxcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVhZChmZW4pIHtcbiAgICBpZiAoZmVuID09PSAnc3RhcnQnKVxuICAgICAgICBmZW4gPSBpbml0aWFsO1xuICAgIGNvbnN0IHBpZWNlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgcm93ID0gNywgY29sID0gMDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgZmVuKSB7XG4gICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICBjYXNlICdbJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGllY2VzO1xuICAgICAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgICAgICAgLS1yb3c7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyA8IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwaWVjZXM7XG4gICAgICAgICAgICAgICAgY29sID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ34nOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGllY2UgPSBwaWVjZXMuZ2V0KHBvczJrZXkoW2NvbCAtIDEsIHJvd10pKTtcbiAgICAgICAgICAgICAgICBpZiAocGllY2UpXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlLnByb21vdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYiA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgICBpZiAobmIgPCA1NylcbiAgICAgICAgICAgICAgICAgICAgY29sICs9IG5iIC0gNDg7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBjLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHBpZWNlcy5zZXQocG9zMmtleShbY29sLCByb3ddKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZXNbcm9sZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYyA9PT0gcm9sZSA/ICdibGFjaycgOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgKytjb2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwaWVjZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JpdGUocGllY2VzKSB7XG4gICAgcmV0dXJuIGludlJhbmtzXG4gICAgICAgIC5tYXAoeSA9PiBjZy5maWxlc1xuICAgICAgICAubWFwKHggPT4ge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHBpZWNlcy5nZXQoKHggKyB5KSk7XG4gICAgICAgIGlmIChwaWVjZSkge1xuICAgICAgICAgICAgbGV0IHAgPSBsZXR0ZXJzW3BpZWNlLnJvbGVdO1xuICAgICAgICAgICAgaWYgKHBpZWNlLmNvbG9yID09PSAnd2hpdGUnKVxuICAgICAgICAgICAgICAgIHAgPSBwLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGllY2UucHJvbW90ZWQpXG4gICAgICAgICAgICAgICAgcCArPSAnfic7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJzEnO1xuICAgIH0pXG4gICAgICAgIC5qb2luKCcnKSlcbiAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICAucmVwbGFjZSgvMXsyLH0vZywgcyA9PiBzLmxlbmd0aC50b1N0cmluZygpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZlbi5qcy5tYXAiLCJpbXBvcnQgeyBzZXRDaGVjaywgc2V0U2VsZWN0ZWQgfSBmcm9tICcuL2JvYXJkLmpzJztcbmltcG9ydCB7IHJlYWQgYXMgZmVuUmVhZCB9IGZyb20gJy4vZmVuLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBhcHBseUFuaW1hdGlvbihzdGF0ZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgZGVlcE1lcmdlKHN0YXRlLmFuaW1hdGlvbiwgY29uZmlnLmFuaW1hdGlvbik7XG4gICAgICAgIC8vIG5vIG5lZWQgZm9yIHN1Y2ggc2hvcnQgYW5pbWF0aW9uc1xuICAgICAgICBpZiAoKHN0YXRlLmFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwKSA8IDcwKVxuICAgICAgICAgICAgc3RhdGUuYW5pbWF0aW9uLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKHN0YXRlLCBjb25maWcpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIC8vIGRvbid0IG1lcmdlIGRlc3RpbmF0aW9ucyBhbmQgYXV0b1NoYXBlcy4gSnVzdCBvdmVycmlkZS5cbiAgICBpZiAoKF9hID0gY29uZmlnLm1vdmFibGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXN0cylcbiAgICAgICAgc3RhdGUubW92YWJsZS5kZXN0cyA9IHVuZGVmaW5lZDtcbiAgICBpZiAoKF9iID0gY29uZmlnLmRyYXdhYmxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYXV0b1NoYXBlcylcbiAgICAgICAgc3RhdGUuZHJhd2FibGUuYXV0b1NoYXBlcyA9IFtdO1xuICAgIGRlZXBNZXJnZShzdGF0ZSwgY29uZmlnKTtcbiAgICAvLyBpZiBhIGZlbiB3YXMgcHJvdmlkZWQsIHJlcGxhY2UgdGhlIHBpZWNlc1xuICAgIGlmIChjb25maWcuZmVuKSB7XG4gICAgICAgIHN0YXRlLnBpZWNlcyA9IGZlblJlYWQoY29uZmlnLmZlbik7XG4gICAgICAgIHN0YXRlLmRyYXdhYmxlLnNoYXBlcyA9IFtdO1xuICAgIH1cbiAgICAvLyBhcHBseSBjb25maWcgdmFsdWVzIHRoYXQgY291bGQgYmUgdW5kZWZpbmVkIHlldCBtZWFuaW5nZnVsXG4gICAgaWYgKCdjaGVjaycgaW4gY29uZmlnKVxuICAgICAgICBzZXRDaGVjayhzdGF0ZSwgY29uZmlnLmNoZWNrIHx8IGZhbHNlKTtcbiAgICBpZiAoJ2xhc3RNb3ZlJyBpbiBjb25maWcgJiYgIWNvbmZpZy5sYXN0TW92ZSlcbiAgICAgICAgc3RhdGUubGFzdE1vdmUgPSB1bmRlZmluZWQ7XG4gICAgLy8gaW4gY2FzZSBvZiBaSCBkcm9wIGxhc3QgbW92ZSwgdGhlcmUncyBhIHNpbmdsZSBzcXVhcmUuXG4gICAgLy8gaWYgdGhlIHByZXZpb3VzIGxhc3QgbW92ZSBoYWQgdHdvIHNxdWFyZXMsXG4gICAgLy8gdGhlIG1lcmdlIGFsZ29yaXRobSB3aWxsIGluY29ycmVjdGx5IGtlZXAgdGhlIHNlY29uZCBzcXVhcmUuXG4gICAgZWxzZSBpZiAoY29uZmlnLmxhc3RNb3ZlKVxuICAgICAgICBzdGF0ZS5sYXN0TW92ZSA9IGNvbmZpZy5sYXN0TW92ZTtcbiAgICAvLyBmaXggbW92ZS9wcmVtb3ZlIGRlc3RzXG4gICAgaWYgKHN0YXRlLnNlbGVjdGVkKVxuICAgICAgICBzZXRTZWxlY3RlZChzdGF0ZSwgc3RhdGUuc2VsZWN0ZWQpO1xuICAgIGFwcGx5QW5pbWF0aW9uKHN0YXRlLCBjb25maWcpO1xuICAgIGlmICghc3RhdGUubW92YWJsZS5yb29rQ2FzdGxlICYmIHN0YXRlLm1vdmFibGUuZGVzdHMpIHtcbiAgICAgICAgY29uc3QgcmFuayA9IHN0YXRlLm1vdmFibGUuY29sb3IgPT09ICd3aGl0ZScgPyAnMScgOiAnOCcsIGtpbmdTdGFydFBvcyA9ICgnZScgKyByYW5rKSwgZGVzdHMgPSBzdGF0ZS5tb3ZhYmxlLmRlc3RzLmdldChraW5nU3RhcnRQb3MpLCBraW5nID0gc3RhdGUucGllY2VzLmdldChraW5nU3RhcnRQb3MpO1xuICAgICAgICBpZiAoIWRlc3RzIHx8ICFraW5nIHx8IGtpbmcucm9sZSAhPT0gJ2tpbmcnKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzdGF0ZS5tb3ZhYmxlLmRlc3RzLnNldChraW5nU3RhcnRQb3MsIGRlc3RzLmZpbHRlcihkID0+ICEoZCA9PT0gJ2EnICsgcmFuayAmJiBkZXN0cy5pbmNsdWRlcygoJ2MnICsgcmFuaykpKSAmJlxuICAgICAgICAgICAgIShkID09PSAnaCcgKyByYW5rICYmIGRlc3RzLmluY2x1ZGVzKCgnZycgKyByYW5rKSkpKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGVlcE1lcmdlKGJhc2UsIGV4dGVuZCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGV4dGVuZCkge1xuICAgICAgICBpZiAoaXNPYmplY3QoYmFzZVtrZXldKSAmJiBpc09iamVjdChleHRlbmRba2V5XSkpXG4gICAgICAgICAgICBkZWVwTWVyZ2UoYmFzZVtrZXldLCBleHRlbmRba2V5XSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJhc2Vba2V5XSA9IGV4dGVuZFtrZXldO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcbiAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBhbmltKG11dGF0aW9uLCBzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZS5hbmltYXRpb24uZW5hYmxlZCA/IGFuaW1hdGUobXV0YXRpb24sIHN0YXRlKSA6IHJlbmRlcihtdXRhdGlvbiwgc3RhdGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihtdXRhdGlvbiwgc3RhdGUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBtdXRhdGlvbihzdGF0ZSk7XG4gICAgc3RhdGUuZG9tLnJlZHJhdygpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtYWtlUGllY2Uoa2V5LCBwaWVjZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBwb3M6IHV0aWwua2V5MnBvcyhrZXkpLFxuICAgICAgICBwaWVjZTogcGllY2UsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNsb3NlcihwaWVjZSwgcGllY2VzKSB7XG4gICAgcmV0dXJuIHBpZWNlcy5zb3J0KChwMSwgcDIpID0+IHtcbiAgICAgICAgcmV0dXJuIHV0aWwuZGlzdGFuY2VTcShwaWVjZS5wb3MsIHAxLnBvcykgLSB1dGlsLmRpc3RhbmNlU3EocGllY2UucG9zLCBwMi5wb3MpO1xuICAgIH0pWzBdO1xufVxuZnVuY3Rpb24gY29tcHV0ZVBsYW4ocHJldlBpZWNlcywgY3VycmVudCkge1xuICAgIGNvbnN0IGFuaW1zID0gbmV3IE1hcCgpLCBhbmltZWRPcmlncyA9IFtdLCBmYWRpbmdzID0gbmV3IE1hcCgpLCBtaXNzaW5ncyA9IFtdLCBuZXdzID0gW10sIHByZVBpZWNlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgY3VyUCwgcHJlUCwgdmVjdG9yO1xuICAgIGZvciAoY29uc3QgW2ssIHBdIG9mIHByZXZQaWVjZXMpIHtcbiAgICAgICAgcHJlUGllY2VzLnNldChrLCBtYWtlUGllY2UoaywgcCkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBvZiB1dGlsLmFsbEtleXMpIHtcbiAgICAgICAgY3VyUCA9IGN1cnJlbnQucGllY2VzLmdldChrZXkpO1xuICAgICAgICBwcmVQID0gcHJlUGllY2VzLmdldChrZXkpO1xuICAgICAgICBpZiAoY3VyUCkge1xuICAgICAgICAgICAgaWYgKHByZVApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWwuc2FtZVBpZWNlKGN1clAsIHByZVAucGllY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pc3NpbmdzLnB1c2gocHJlUCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld3MucHVzaChtYWtlUGllY2Uoa2V5LCBjdXJQKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG5ld3MucHVzaChtYWtlUGllY2Uoa2V5LCBjdXJQKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJlUClcbiAgICAgICAgICAgIG1pc3NpbmdzLnB1c2gocHJlUCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgbmV3UCBvZiBuZXdzKSB7XG4gICAgICAgIHByZVAgPSBjbG9zZXIobmV3UCwgbWlzc2luZ3MuZmlsdGVyKHAgPT4gdXRpbC5zYW1lUGllY2UobmV3UC5waWVjZSwgcC5waWVjZSkpKTtcbiAgICAgICAgaWYgKHByZVApIHtcbiAgICAgICAgICAgIHZlY3RvciA9IFtwcmVQLnBvc1swXSAtIG5ld1AucG9zWzBdLCBwcmVQLnBvc1sxXSAtIG5ld1AucG9zWzFdXTtcbiAgICAgICAgICAgIGFuaW1zLnNldChuZXdQLmtleSwgdmVjdG9yLmNvbmNhdCh2ZWN0b3IpKTtcbiAgICAgICAgICAgIGFuaW1lZE9yaWdzLnB1c2gocHJlUC5rZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgcCBvZiBtaXNzaW5ncykge1xuICAgICAgICBpZiAoIWFuaW1lZE9yaWdzLmluY2x1ZGVzKHAua2V5KSlcbiAgICAgICAgICAgIGZhZGluZ3Muc2V0KHAua2V5LCBwLnBpZWNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYW5pbXM6IGFuaW1zLFxuICAgICAgICBmYWRpbmdzOiBmYWRpbmdzLFxuICAgIH07XG59XG5mdW5jdGlvbiBzdGVwKHN0YXRlLCBub3cpIHtcbiAgICBjb25zdCBjdXIgPSBzdGF0ZS5hbmltYXRpb24uY3VycmVudDtcbiAgICBpZiAoY3VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gYW5pbWF0aW9uIHdhcyBjYW5jZWxlZCA6KFxuICAgICAgICBpZiAoIXN0YXRlLmRvbS5kZXN0cm95ZWQpXG4gICAgICAgICAgICBzdGF0ZS5kb20ucmVkcmF3Tm93KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzdCA9IDEgLSAobm93IC0gY3VyLnN0YXJ0KSAqIGN1ci5mcmVxdWVuY3k7XG4gICAgaWYgKHJlc3QgPD0gMCkge1xuICAgICAgICBzdGF0ZS5hbmltYXRpb24uY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3RhdGUuZG9tLnJlZHJhd05vdygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZWFzZSA9IGVhc2luZyhyZXN0KTtcbiAgICAgICAgZm9yIChjb25zdCBjZmcgb2YgY3VyLnBsYW4uYW5pbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGNmZ1syXSA9IGNmZ1swXSAqIGVhc2U7XG4gICAgICAgICAgICBjZmdbM10gPSBjZmdbMV0gKiBlYXNlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmRvbS5yZWRyYXdOb3codHJ1ZSk7IC8vIG9wdGltaXNhdGlvbjogZG9uJ3QgcmVuZGVyIFNWRyBjaGFuZ2VzIGR1cmluZyBhbmltYXRpb25zXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgobm93ID0gcGVyZm9ybWFuY2Uubm93KCkpID0+IHN0ZXAoc3RhdGUsIG5vdykpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFuaW1hdGUobXV0YXRpb24sIHN0YXRlKSB7XG4gICAgLy8gY2xvbmUgc3RhdGUgYmVmb3JlIG11dGF0aW5nIGl0XG4gICAgY29uc3QgcHJldlBpZWNlcyA9IG5ldyBNYXAoc3RhdGUucGllY2VzKTtcbiAgICBjb25zdCByZXN1bHQgPSBtdXRhdGlvbihzdGF0ZSk7XG4gICAgY29uc3QgcGxhbiA9IGNvbXB1dGVQbGFuKHByZXZQaWVjZXMsIHN0YXRlKTtcbiAgICBpZiAocGxhbi5hbmltcy5zaXplIHx8IHBsYW4uZmFkaW5ncy5zaXplKSB7XG4gICAgICAgIGNvbnN0IGFscmVhZHlSdW5uaW5nID0gc3RhdGUuYW5pbWF0aW9uLmN1cnJlbnQgJiYgc3RhdGUuYW5pbWF0aW9uLmN1cnJlbnQuc3RhcnQ7XG4gICAgICAgIHN0YXRlLmFuaW1hdGlvbi5jdXJyZW50ID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiAxIC8gc3RhdGUuYW5pbWF0aW9uLmR1cmF0aW9uLFxuICAgICAgICAgICAgcGxhbjogcGxhbixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFhbHJlYWR5UnVubmluZylcbiAgICAgICAgICAgIHN0ZXAoc3RhdGUsIHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGRvbid0IGFuaW1hdGUsIGp1c3QgcmVuZGVyIHJpZ2h0IGF3YXlcbiAgICAgICAgc3RhdGUuZG9tLnJlZHJhdygpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcbmZ1bmN0aW9uIGVhc2luZyh0KSB7XG4gICAgcmV0dXJuIHQgPCAwLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5pbS5qcy5tYXAiLCJpbXBvcnQgeyB1bnNlbGVjdCwgY2FuY2VsTW92ZSwgZ2V0S2V5QXREb21Qb3MsIGdldFNuYXBwZWRLZXlBdERvbVBvcywgd2hpdGVQb3YgfSBmcm9tICcuL2JvYXJkLmpzJztcbmltcG9ydCB7IGV2ZW50UG9zaXRpb24sIGlzUmlnaHRCdXR0b24gfSBmcm9tICcuL3V0aWwuanMnO1xuY29uc3QgYnJ1c2hlcyA9IFsnZ3JlZW4nLCAncmVkJywgJ2JsdWUnLCAneWVsbG93J107XG5leHBvcnQgZnVuY3Rpb24gc3RhcnQoc3RhdGUsIGUpIHtcbiAgICAvLyBzdXBwb3J0IG9uZSBmaW5nZXIgdG91Y2ggb25seVxuICAgIGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDEpXG4gICAgICAgIHJldHVybjtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLmN0cmxLZXkgPyB1bnNlbGVjdChzdGF0ZSkgOiBjYW5jZWxNb3ZlKHN0YXRlKTtcbiAgICBjb25zdCBwb3MgPSBldmVudFBvc2l0aW9uKGUpLCBvcmlnID0gZ2V0S2V5QXREb21Qb3MocG9zLCB3aGl0ZVBvdihzdGF0ZSksIHN0YXRlLmRvbS5ib3VuZHMoKSk7XG4gICAgaWYgKCFvcmlnKVxuICAgICAgICByZXR1cm47XG4gICAgc3RhdGUuZHJhd2FibGUuY3VycmVudCA9IHtcbiAgICAgICAgb3JpZyxcbiAgICAgICAgcG9zLFxuICAgICAgICBicnVzaDogZXZlbnRCcnVzaChlKSxcbiAgICAgICAgc25hcFRvVmFsaWRNb3ZlOiBzdGF0ZS5kcmF3YWJsZS5kZWZhdWx0U25hcFRvVmFsaWRNb3ZlLFxuICAgIH07XG4gICAgcHJvY2Vzc0RyYXcoc3RhdGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NEcmF3KHN0YXRlKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgY3VyID0gc3RhdGUuZHJhd2FibGUuY3VycmVudDtcbiAgICAgICAgaWYgKGN1cikge1xuICAgICAgICAgICAgY29uc3Qga2V5QXREb21Qb3MgPSBnZXRLZXlBdERvbVBvcyhjdXIucG9zLCB3aGl0ZVBvdihzdGF0ZSksIHN0YXRlLmRvbS5ib3VuZHMoKSk7XG4gICAgICAgICAgICBpZiAoIWtleUF0RG9tUG9zKSB7XG4gICAgICAgICAgICAgICAgY3VyLnNuYXBUb1ZhbGlkTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbW91c2VTcSA9IGN1ci5zbmFwVG9WYWxpZE1vdmVcbiAgICAgICAgICAgICAgICA/IGdldFNuYXBwZWRLZXlBdERvbVBvcyhjdXIub3JpZywgY3VyLnBvcywgd2hpdGVQb3Yoc3RhdGUpLCBzdGF0ZS5kb20uYm91bmRzKCkpXG4gICAgICAgICAgICAgICAgOiBrZXlBdERvbVBvcztcbiAgICAgICAgICAgIGlmIChtb3VzZVNxICE9PSBjdXIubW91c2VTcSkge1xuICAgICAgICAgICAgICAgIGN1ci5tb3VzZVNxID0gbW91c2VTcTtcbiAgICAgICAgICAgICAgICBjdXIuZGVzdCA9IG1vdXNlU3EgIT09IGN1ci5vcmlnID8gbW91c2VTcSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBzdGF0ZS5kb20ucmVkcmF3Tm93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9jZXNzRHJhdyhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlKHN0YXRlLCBlKSB7XG4gICAgaWYgKHN0YXRlLmRyYXdhYmxlLmN1cnJlbnQpXG4gICAgICAgIHN0YXRlLmRyYXdhYmxlLmN1cnJlbnQucG9zID0gZXZlbnRQb3NpdGlvbihlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmQoc3RhdGUpIHtcbiAgICBjb25zdCBjdXIgPSBzdGF0ZS5kcmF3YWJsZS5jdXJyZW50O1xuICAgIGlmIChjdXIpIHtcbiAgICAgICAgaWYgKGN1ci5tb3VzZVNxKVxuICAgICAgICAgICAgYWRkU2hhcGUoc3RhdGUuZHJhd2FibGUsIGN1cik7XG4gICAgICAgIGNhbmNlbChzdGF0ZSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5kcmF3YWJsZS5jdXJyZW50KSB7XG4gICAgICAgIHN0YXRlLmRyYXdhYmxlLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHN0YXRlLmRvbS5yZWRyYXcoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuZHJhd2FibGUuc2hhcGVzLmxlbmd0aCkge1xuICAgICAgICBzdGF0ZS5kcmF3YWJsZS5zaGFwZXMgPSBbXTtcbiAgICAgICAgc3RhdGUuZG9tLnJlZHJhdygpO1xuICAgICAgICBvbkNoYW5nZShzdGF0ZS5kcmF3YWJsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXZlbnRCcnVzaChlKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG1vZEEgPSAoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkpICYmIGlzUmlnaHRCdXR0b24oZSk7XG4gICAgY29uc3QgbW9kQiA9IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCAoKF9hID0gZS5nZXRNb2RpZmllclN0YXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChlLCAnQWx0R3JhcGgnKSk7XG4gICAgcmV0dXJuIGJydXNoZXNbKG1vZEEgPyAxIDogMCkgKyAobW9kQiA/IDIgOiAwKV07XG59XG5mdW5jdGlvbiBhZGRTaGFwZShkcmF3YWJsZSwgY3VyKSB7XG4gICAgY29uc3Qgc2FtZVNoYXBlID0gKHMpID0+IHMub3JpZyA9PT0gY3VyLm9yaWcgJiYgcy5kZXN0ID09PSBjdXIuZGVzdDtcbiAgICBjb25zdCBzaW1pbGFyID0gZHJhd2FibGUuc2hhcGVzLmZpbmQoc2FtZVNoYXBlKTtcbiAgICBpZiAoc2ltaWxhcilcbiAgICAgICAgZHJhd2FibGUuc2hhcGVzID0gZHJhd2FibGUuc2hhcGVzLmZpbHRlcihzID0+ICFzYW1lU2hhcGUocykpO1xuICAgIGlmICghc2ltaWxhciB8fCBzaW1pbGFyLmJydXNoICE9PSBjdXIuYnJ1c2gpXG4gICAgICAgIGRyYXdhYmxlLnNoYXBlcy5wdXNoKGN1cik7XG4gICAgb25DaGFuZ2UoZHJhd2FibGUpO1xufVxuZnVuY3Rpb24gb25DaGFuZ2UoZHJhd2FibGUpIHtcbiAgICBpZiAoZHJhd2FibGUub25DaGFuZ2UpXG4gICAgICAgIGRyYXdhYmxlLm9uQ2hhbmdlKGRyYXdhYmxlLnNoYXBlcyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcmF3LmpzLm1hcCIsImltcG9ydCAqIGFzIGJvYXJkIGZyb20gJy4vYm9hcmQuanMnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHsgY2xlYXIgYXMgZHJhd0NsZWFyIH0gZnJvbSAnLi9kcmF3LmpzJztcbmltcG9ydCB7IGFuaW0gfSBmcm9tICcuL2FuaW0uanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KHMsIGUpIHtcbiAgICBpZiAoIWUuaXNUcnVzdGVkIHx8IChlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIGUuYnV0dG9uICE9PSAwKSlcbiAgICAgICAgcmV0dXJuOyAvLyBvbmx5IHRvdWNoIG9yIGxlZnQgY2xpY2tcbiAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPiAxKVxuICAgICAgICByZXR1cm47IC8vIHN1cHBvcnQgb25lIGZpbmdlciB0b3VjaCBvbmx5XG4gICAgY29uc3QgYm91bmRzID0gcy5kb20uYm91bmRzKCksIHBvc2l0aW9uID0gdXRpbC5ldmVudFBvc2l0aW9uKGUpLCBvcmlnID0gYm9hcmQuZ2V0S2V5QXREb21Qb3MocG9zaXRpb24sIGJvYXJkLndoaXRlUG92KHMpLCBib3VuZHMpO1xuICAgIGlmICghb3JpZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHBpZWNlID0gcy5waWVjZXMuZ2V0KG9yaWcpO1xuICAgIGNvbnN0IHByZXZpb3VzbHlTZWxlY3RlZCA9IHMuc2VsZWN0ZWQ7XG4gICAgaWYgKCFwcmV2aW91c2x5U2VsZWN0ZWQgJiYgcy5kcmF3YWJsZS5lbmFibGVkICYmIChzLmRyYXdhYmxlLmVyYXNlT25DbGljayB8fCAhcGllY2UgfHwgcGllY2UuY29sb3IgIT09IHMudHVybkNvbG9yKSlcbiAgICAgICAgZHJhd0NsZWFyKHMpO1xuICAgIC8vIFByZXZlbnQgdG91Y2ggc2Nyb2xsIGFuZCBjcmVhdGUgbm8gY29ycmVzcG9uZGluZyBtb3VzZSBldmVudCwgaWYgdGhlcmVcbiAgICAvLyBpcyBhbiBpbnRlbnQgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYm9hcmQuXG4gICAgaWYgKGUuY2FuY2VsYWJsZSAhPT0gZmFsc2UgJiZcbiAgICAgICAgKCFlLnRvdWNoZXMgfHwgcy5ibG9ja1RvdWNoU2Nyb2xsIHx8IHBpZWNlIHx8IHByZXZpb3VzbHlTZWxlY3RlZCB8fCBwaWVjZUNsb3NlVG8ocywgcG9zaXRpb24pKSlcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGhhZFByZW1vdmUgPSAhIXMucHJlbW92YWJsZS5jdXJyZW50O1xuICAgIGNvbnN0IGhhZFByZWRyb3AgPSAhIXMucHJlZHJvcHBhYmxlLmN1cnJlbnQ7XG4gICAgcy5zdGF0cy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xuICAgIGlmIChzLnNlbGVjdGVkICYmIGJvYXJkLmNhbk1vdmUocywgcy5zZWxlY3RlZCwgb3JpZykpIHtcbiAgICAgICAgYW5pbShzdGF0ZSA9PiBib2FyZC5zZWxlY3RTcXVhcmUoc3RhdGUsIG9yaWcpLCBzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJvYXJkLnNlbGVjdFNxdWFyZShzLCBvcmlnKTtcbiAgICB9XG4gICAgY29uc3Qgc3RpbGxTZWxlY3RlZCA9IHMuc2VsZWN0ZWQgPT09IG9yaWc7XG4gICAgY29uc3QgZWxlbWVudCA9IHBpZWNlRWxlbWVudEJ5S2V5KHMsIG9yaWcpO1xuICAgIGlmIChwaWVjZSAmJiBlbGVtZW50ICYmIHN0aWxsU2VsZWN0ZWQgJiYgYm9hcmQuaXNEcmFnZ2FibGUocywgb3JpZykpIHtcbiAgICAgICAgcy5kcmFnZ2FibGUuY3VycmVudCA9IHtcbiAgICAgICAgICAgIG9yaWcsXG4gICAgICAgICAgICBwaWVjZSxcbiAgICAgICAgICAgIG9yaWdQb3M6IHBvc2l0aW9uLFxuICAgICAgICAgICAgcG9zOiBwb3NpdGlvbixcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHMuZHJhZ2dhYmxlLmF1dG9EaXN0YW5jZSAmJiBzLnN0YXRzLmRyYWdnZWQsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgcHJldmlvdXNseVNlbGVjdGVkLFxuICAgICAgICAgICAgb3JpZ2luVGFyZ2V0OiBlLnRhcmdldCxcbiAgICAgICAgICAgIGtleUhhc0NoYW5nZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICBlbGVtZW50LmNnRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gICAgICAgIC8vIHBsYWNlIGdob3N0XG4gICAgICAgIGNvbnN0IGdob3N0ID0gcy5kb20uZWxlbWVudHMuZ2hvc3Q7XG4gICAgICAgIGlmIChnaG9zdCkge1xuICAgICAgICAgICAgZ2hvc3QuY2xhc3NOYW1lID0gYGdob3N0ICR7cGllY2UuY29sb3J9ICR7cGllY2Uucm9sZX1gO1xuICAgICAgICAgICAgdXRpbC50cmFuc2xhdGUoZ2hvc3QsIHV0aWwucG9zVG9UcmFuc2xhdGUoYm91bmRzKSh1dGlsLmtleTJwb3Mob3JpZyksIGJvYXJkLndoaXRlUG92KHMpKSk7XG4gICAgICAgICAgICB1dGlsLnNldFZpc2libGUoZ2hvc3QsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NEcmFnKHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGhhZFByZW1vdmUpXG4gICAgICAgICAgICBib2FyZC51bnNldFByZW1vdmUocyk7XG4gICAgICAgIGlmIChoYWRQcmVkcm9wKVxuICAgICAgICAgICAgYm9hcmQudW5zZXRQcmVkcm9wKHMpO1xuICAgIH1cbiAgICBzLmRvbS5yZWRyYXcoKTtcbn1cbmZ1bmN0aW9uIHBpZWNlQ2xvc2VUbyhzLCBwb3MpIHtcbiAgICBjb25zdCBhc1doaXRlID0gYm9hcmQud2hpdGVQb3YocyksIGJvdW5kcyA9IHMuZG9tLmJvdW5kcygpLCByYWRpdXNTcSA9IE1hdGgucG93KGJvdW5kcy53aWR0aCAvIDgsIDIpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHMucGllY2VzLmtleXMoKSkge1xuICAgICAgICBjb25zdCBjZW50ZXIgPSB1dGlsLmNvbXB1dGVTcXVhcmVDZW50ZXIoa2V5LCBhc1doaXRlLCBib3VuZHMpO1xuICAgICAgICBpZiAodXRpbC5kaXN0YW5jZVNxKGNlbnRlciwgcG9zKSA8PSByYWRpdXNTcSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhZ05ld1BpZWNlKHMsIHBpZWNlLCBlLCBmb3JjZSkge1xuICAgIGNvbnN0IGtleSA9ICdhMCc7XG4gICAgcy5waWVjZXMuc2V0KGtleSwgcGllY2UpO1xuICAgIHMuZG9tLnJlZHJhdygpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdXRpbC5ldmVudFBvc2l0aW9uKGUpO1xuICAgIHMuZHJhZ2dhYmxlLmN1cnJlbnQgPSB7XG4gICAgICAgIG9yaWc6IGtleSxcbiAgICAgICAgcGllY2UsXG4gICAgICAgIG9yaWdQb3M6IHBvc2l0aW9uLFxuICAgICAgICBwb3M6IHBvc2l0aW9uLFxuICAgICAgICBzdGFydGVkOiB0cnVlLFxuICAgICAgICBlbGVtZW50OiAoKSA9PiBwaWVjZUVsZW1lbnRCeUtleShzLCBrZXkpLFxuICAgICAgICBvcmlnaW5UYXJnZXQ6IGUudGFyZ2V0LFxuICAgICAgICBuZXdQaWVjZTogdHJ1ZSxcbiAgICAgICAgZm9yY2U6ICEhZm9yY2UsXG4gICAgICAgIGtleUhhc0NoYW5nZWQ6IGZhbHNlLFxuICAgIH07XG4gICAgcHJvY2Vzc0RyYWcocyk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRHJhZyhzKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjdXIgPSBzLmRyYWdnYWJsZS5jdXJyZW50O1xuICAgICAgICBpZiAoIWN1cilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gY2FuY2VsIGFuaW1hdGlvbnMgd2hpbGUgZHJhZ2dpbmdcbiAgICAgICAgaWYgKChfYSA9IHMuYW5pbWF0aW9uLmN1cnJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wbGFuLmFuaW1zLmhhcyhjdXIub3JpZykpXG4gICAgICAgICAgICBzLmFuaW1hdGlvbi5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBpZiBtb3ZpbmcgcGllY2UgaXMgZ29uZSwgY2FuY2VsXG4gICAgICAgIGNvbnN0IG9yaWdQaWVjZSA9IHMucGllY2VzLmdldChjdXIub3JpZyk7XG4gICAgICAgIGlmICghb3JpZ1BpZWNlIHx8ICF1dGlsLnNhbWVQaWVjZShvcmlnUGllY2UsIGN1ci5waWVjZSkpXG4gICAgICAgICAgICBjYW5jZWwocyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjdXIuc3RhcnRlZCAmJiB1dGlsLmRpc3RhbmNlU3EoY3VyLnBvcywgY3VyLm9yaWdQb3MpID49IE1hdGgucG93KHMuZHJhZ2dhYmxlLmRpc3RhbmNlLCAyKSlcbiAgICAgICAgICAgICAgICBjdXIuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY3VyLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGxhenkgZWxlbWVudHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1ci5lbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY3VyLmVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQuY2dEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGN1ci5lbGVtZW50ID0gZm91bmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IHMuZG9tLmJvdW5kcygpO1xuICAgICAgICAgICAgICAgIHV0aWwudHJhbnNsYXRlKGN1ci5lbGVtZW50LCBbXG4gICAgICAgICAgICAgICAgICAgIGN1ci5wb3NbMF0gLSBib3VuZHMubGVmdCAtIGJvdW5kcy53aWR0aCAvIDE2LFxuICAgICAgICAgICAgICAgICAgICBjdXIucG9zWzFdIC0gYm91bmRzLnRvcCAtIGJvdW5kcy5oZWlnaHQgLyAxNixcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICBjdXIua2V5SGFzQ2hhbmdlZCB8fCAoY3VyLmtleUhhc0NoYW5nZWQgPSBjdXIub3JpZyAhPT0gYm9hcmQuZ2V0S2V5QXREb21Qb3MoY3VyLnBvcywgYm9hcmQud2hpdGVQb3YocyksIGJvdW5kcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NEcmFnKHMpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1vdmUocywgZSkge1xuICAgIC8vIHN1cHBvcnQgb25lIGZpbmdlciB0b3VjaCBvbmx5XG4gICAgaWYgKHMuZHJhZ2dhYmxlLmN1cnJlbnQgJiYgKCFlLnRvdWNoZXMgfHwgZS50b3VjaGVzLmxlbmd0aCA8IDIpKSB7XG4gICAgICAgIHMuZHJhZ2dhYmxlLmN1cnJlbnQucG9zID0gdXRpbC5ldmVudFBvc2l0aW9uKGUpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmQocywgZSkge1xuICAgIGNvbnN0IGN1ciA9IHMuZHJhZ2dhYmxlLmN1cnJlbnQ7XG4gICAgaWYgKCFjdXIpXG4gICAgICAgIHJldHVybjtcbiAgICAvLyBjcmVhdGUgbm8gY29ycmVzcG9uZGluZyBtb3VzZSBldmVudFxuICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgZS5jYW5jZWxhYmxlICE9PSBmYWxzZSlcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbXBhcmluZyB3aXRoIHRoZSBvcmlnaW4gdGFyZ2V0IGlzIGFuIGVhc3kgd2F5IHRvIHRlc3QgdGhhdCB0aGUgZW5kIGV2ZW50XG4gICAgLy8gaGFzIHRoZSBzYW1lIHRvdWNoIG9yaWdpblxuICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgY3VyLm9yaWdpblRhcmdldCAhPT0gZS50YXJnZXQgJiYgIWN1ci5uZXdQaWVjZSkge1xuICAgICAgICBzLmRyYWdnYWJsZS5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGJvYXJkLnVuc2V0UHJlbW92ZShzKTtcbiAgICBib2FyZC51bnNldFByZWRyb3Aocyk7XG4gICAgLy8gdG91Y2hlbmQgaGFzIG5vIHBvc2l0aW9uOyBzbyB1c2UgdGhlIGxhc3QgdG91Y2htb3ZlIHBvc2l0aW9uIGluc3RlYWRcbiAgICBjb25zdCBldmVudFBvcyA9IHV0aWwuZXZlbnRQb3NpdGlvbihlKSB8fCBjdXIucG9zO1xuICAgIGNvbnN0IGRlc3QgPSBib2FyZC5nZXRLZXlBdERvbVBvcyhldmVudFBvcywgYm9hcmQud2hpdGVQb3YocyksIHMuZG9tLmJvdW5kcygpKTtcbiAgICBpZiAoZGVzdCAmJiBjdXIuc3RhcnRlZCAmJiBjdXIub3JpZyAhPT0gZGVzdCkge1xuICAgICAgICBpZiAoY3VyLm5ld1BpZWNlKVxuICAgICAgICAgICAgYm9hcmQuZHJvcE5ld1BpZWNlKHMsIGN1ci5vcmlnLCBkZXN0LCBjdXIuZm9yY2UpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMuc3RhdHMuY3RybEtleSA9IGUuY3RybEtleTtcbiAgICAgICAgICAgIGlmIChib2FyZC51c2VyTW92ZShzLCBjdXIub3JpZywgZGVzdCkpXG4gICAgICAgICAgICAgICAgcy5zdGF0cy5kcmFnZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChjdXIubmV3UGllY2UpIHtcbiAgICAgICAgcy5waWVjZXMuZGVsZXRlKGN1ci5vcmlnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5kcmFnZ2FibGUuZGVsZXRlT25Ecm9wT2ZmICYmICFkZXN0KSB7XG4gICAgICAgIHMucGllY2VzLmRlbGV0ZShjdXIub3JpZyk7XG4gICAgICAgIGJvYXJkLmNhbGxVc2VyRnVuY3Rpb24ocy5ldmVudHMuY2hhbmdlKTtcbiAgICB9XG4gICAgaWYgKChjdXIub3JpZyA9PT0gY3VyLnByZXZpb3VzbHlTZWxlY3RlZCB8fCBjdXIua2V5SGFzQ2hhbmdlZCkgJiYgKGN1ci5vcmlnID09PSBkZXN0IHx8ICFkZXN0KSlcbiAgICAgICAgYm9hcmQudW5zZWxlY3Qocyk7XG4gICAgZWxzZSBpZiAoIXMuc2VsZWN0YWJsZS5lbmFibGVkKVxuICAgICAgICBib2FyZC51bnNlbGVjdChzKTtcbiAgICByZW1vdmVEcmFnRWxlbWVudHMocyk7XG4gICAgcy5kcmFnZ2FibGUuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICBzLmRvbS5yZWRyYXcoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWwocykge1xuICAgIGNvbnN0IGN1ciA9IHMuZHJhZ2dhYmxlLmN1cnJlbnQ7XG4gICAgaWYgKGN1cikge1xuICAgICAgICBpZiAoY3VyLm5ld1BpZWNlKVxuICAgICAgICAgICAgcy5waWVjZXMuZGVsZXRlKGN1ci5vcmlnKTtcbiAgICAgICAgcy5kcmFnZ2FibGUuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgYm9hcmQudW5zZWxlY3Qocyk7XG4gICAgICAgIHJlbW92ZURyYWdFbGVtZW50cyhzKTtcbiAgICAgICAgcy5kb20ucmVkcmF3KCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlRHJhZ0VsZW1lbnRzKHMpIHtcbiAgICBjb25zdCBlID0gcy5kb20uZWxlbWVudHM7XG4gICAgaWYgKGUuZ2hvc3QpXG4gICAgICAgIHV0aWwuc2V0VmlzaWJsZShlLmdob3N0LCBmYWxzZSk7XG59XG5mdW5jdGlvbiBwaWVjZUVsZW1lbnRCeUtleShzLCBrZXkpIHtcbiAgICBsZXQgZWwgPSBzLmRvbS5lbGVtZW50cy5ib2FyZC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgICBpZiAoZWwuY2dLZXkgPT09IGtleSAmJiBlbC50YWdOYW1lID09PSAnUElFQ0UnKVxuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICBlbCA9IGVsLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm47XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kcmFnLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBleHBsb3Npb24oc3RhdGUsIGtleXMpIHtcbiAgICBzdGF0ZS5leHBsb2RpbmcgPSB7IHN0YWdlOiAxLCBrZXlzIH07XG4gICAgc3RhdGUuZG9tLnJlZHJhdygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRTdGFnZShzdGF0ZSwgMik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3RhZ2Uoc3RhdGUsIHVuZGVmaW5lZCksIDEyMCk7XG4gICAgfSwgMTIwKTtcbn1cbmZ1bmN0aW9uIHNldFN0YWdlKHN0YXRlLCBzdGFnZSkge1xuICAgIGlmIChzdGF0ZS5leHBsb2RpbmcpIHtcbiAgICAgICAgaWYgKHN0YWdlKVxuICAgICAgICAgICAgc3RhdGUuZXhwbG9kaW5nLnN0YWdlID0gc3RhZ2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0YXRlLmV4cGxvZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3RhdGUuZG9tLnJlZHJhdygpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4cGxvc2lvbi5qcy5tYXAiLCJpbXBvcnQgKiBhcyBib2FyZCBmcm9tICcuL2JvYXJkLmpzJztcbmltcG9ydCB7IHdyaXRlIGFzIGZlbldyaXRlIH0gZnJvbSAnLi9mZW4uanMnO1xuaW1wb3J0IHsgY29uZmlndXJlLCBhcHBseUFuaW1hdGlvbiB9IGZyb20gJy4vY29uZmlnLmpzJztcbmltcG9ydCB7IGFuaW0sIHJlbmRlciB9IGZyb20gJy4vYW5pbS5qcyc7XG5pbXBvcnQgeyBjYW5jZWwgYXMgZHJhZ0NhbmNlbCwgZHJhZ05ld1BpZWNlIH0gZnJvbSAnLi9kcmFnLmpzJztcbmltcG9ydCB7IGV4cGxvc2lvbiB9IGZyb20gJy4vZXhwbG9zaW9uLmpzJztcbi8vIHNlZSBBUEkgdHlwZXMgYW5kIGRvY3VtZW50YXRpb25zIGluIGR0cy9hcGkuZC50c1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KHN0YXRlLCByZWRyYXdBbGwpIHtcbiAgICBmdW5jdGlvbiB0b2dnbGVPcmllbnRhdGlvbigpIHtcbiAgICAgICAgYm9hcmQudG9nZ2xlT3JpZW50YXRpb24oc3RhdGUpO1xuICAgICAgICByZWRyYXdBbGwoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0KGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5vcmllbnRhdGlvbiAmJiBjb25maWcub3JpZW50YXRpb24gIT09IHN0YXRlLm9yaWVudGF0aW9uKVxuICAgICAgICAgICAgICAgIHRvZ2dsZU9yaWVudGF0aW9uKCk7XG4gICAgICAgICAgICBhcHBseUFuaW1hdGlvbihzdGF0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIChjb25maWcuZmVuID8gYW5pbSA6IHJlbmRlcikoc3RhdGUgPT4gY29uZmlndXJlKHN0YXRlLCBjb25maWcpLCBzdGF0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBnZXRGZW46ICgpID0+IGZlbldyaXRlKHN0YXRlLnBpZWNlcyksXG4gICAgICAgIHRvZ2dsZU9yaWVudGF0aW9uLFxuICAgICAgICBzZXRQaWVjZXMocGllY2VzKSB7XG4gICAgICAgICAgICBhbmltKHN0YXRlID0+IGJvYXJkLnNldFBpZWNlcyhzdGF0ZSwgcGllY2VzKSwgc3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RTcXVhcmUoa2V5LCBmb3JjZSkge1xuICAgICAgICAgICAgaWYgKGtleSlcbiAgICAgICAgICAgICAgICBhbmltKHN0YXRlID0+IGJvYXJkLnNlbGVjdFNxdWFyZShzdGF0ZSwga2V5LCBmb3JjZSksIHN0YXRlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQudW5zZWxlY3Qoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRvbS5yZWRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW92ZShvcmlnLCBkZXN0KSB7XG4gICAgICAgICAgICBhbmltKHN0YXRlID0+IGJvYXJkLmJhc2VNb3ZlKHN0YXRlLCBvcmlnLCBkZXN0KSwgc3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBuZXdQaWVjZShwaWVjZSwga2V5KSB7XG4gICAgICAgICAgICBhbmltKHN0YXRlID0+IGJvYXJkLmJhc2VOZXdQaWVjZShzdGF0ZSwgcGllY2UsIGtleSksIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcGxheVByZW1vdmUoKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUucHJlbW92YWJsZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW0oYm9hcmQucGxheVByZW1vdmUsIHN0YXRlKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByZW1vdmUgY291bGRuJ3QgYmUgcGxheWVkLCByZWRyYXcgdG8gY2xlYXIgaXQgdXBcbiAgICAgICAgICAgICAgICBzdGF0ZS5kb20ucmVkcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlQcmVkcm9wKHZhbGlkYXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUucHJlZHJvcHBhYmxlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBib2FyZC5wbGF5UHJlZHJvcChzdGF0ZSwgdmFsaWRhdGUpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRvbS5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxQcmVtb3ZlKCkge1xuICAgICAgICAgICAgcmVuZGVyKGJvYXJkLnVuc2V0UHJlbW92ZSwgc3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxQcmVkcm9wKCkge1xuICAgICAgICAgICAgcmVuZGVyKGJvYXJkLnVuc2V0UHJlZHJvcCwgc3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgICBjYW5jZWxNb3ZlKCkge1xuICAgICAgICAgICAgcmVuZGVyKHN0YXRlID0+IHtcbiAgICAgICAgICAgICAgICBib2FyZC5jYW5jZWxNb3ZlKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBkcmFnQ2FuY2VsKHN0YXRlKTtcbiAgICAgICAgICAgIH0sIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcCgpIHtcbiAgICAgICAgICAgIHJlbmRlcihzdGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgYm9hcmQuc3RvcChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgZHJhZ0NhbmNlbChzdGF0ZSk7XG4gICAgICAgICAgICB9LCBzdGF0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGV4cGxvZGUoa2V5cykge1xuICAgICAgICAgICAgZXhwbG9zaW9uKHN0YXRlLCBrZXlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QXV0b1NoYXBlcyhzaGFwZXMpIHtcbiAgICAgICAgICAgIHJlbmRlcihzdGF0ZSA9PiAoc3RhdGUuZHJhd2FibGUuYXV0b1NoYXBlcyA9IHNoYXBlcyksIHN0YXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U2hhcGVzKHNoYXBlcykge1xuICAgICAgICAgICAgcmVuZGVyKHN0YXRlID0+IChzdGF0ZS5kcmF3YWJsZS5zaGFwZXMgPSBzaGFwZXMpLCBzdGF0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEtleUF0RG9tUG9zKHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIGJvYXJkLmdldEtleUF0RG9tUG9zKHBvcywgYm9hcmQud2hpdGVQb3Yoc3RhdGUpLCBzdGF0ZS5kb20uYm91bmRzKCkpO1xuICAgICAgICB9LFxuICAgICAgICByZWRyYXdBbGwsXG4gICAgICAgIGRyYWdOZXdQaWVjZShwaWVjZSwgZXZlbnQsIGZvcmNlKSB7XG4gICAgICAgICAgICBkcmFnTmV3UGllY2Uoc3RhdGUsIHBpZWNlLCBldmVudCwgZm9yY2UpO1xuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgYm9hcmQuc3RvcChzdGF0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5kb20udW5iaW5kICYmIHN0YXRlLmRvbS51bmJpbmQoKTtcbiAgICAgICAgICAgIHN0YXRlLmRvbS5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICB9LFxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcGkuanMubWFwIiwiaW1wb3J0ICogYXMgZmVuIGZyb20gJy4vZmVuLmpzJztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAnLi91dGlsLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwaWVjZXM6IGZlbi5yZWFkKGZlbi5pbml0aWFsKSxcbiAgICAgICAgb3JpZW50YXRpb246ICd3aGl0ZScsXG4gICAgICAgIHR1cm5Db2xvcjogJ3doaXRlJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IHRydWUsXG4gICAgICAgIHJhbmtzUG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgIGF1dG9DYXN0bGU6IHRydWUsXG4gICAgICAgIHZpZXdPbmx5OiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZUNvbnRleHRNZW51OiBmYWxzZSxcbiAgICAgICAgYWRkUGllY2VaSW5kZXg6IGZhbHNlLFxuICAgICAgICBhZGREaW1lbnNpb25zQ3NzVmFyczogZmFsc2UsXG4gICAgICAgIGJsb2NrVG91Y2hTY3JvbGw6IGZhbHNlLFxuICAgICAgICBwaWVjZUtleTogZmFsc2UsXG4gICAgICAgIGhpZ2hsaWdodDoge1xuICAgICAgICAgICAgbGFzdE1vdmU6IHRydWUsXG4gICAgICAgICAgICBjaGVjazogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgfSxcbiAgICAgICAgbW92YWJsZToge1xuICAgICAgICAgICAgZnJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnYm90aCcsXG4gICAgICAgICAgICBzaG93RGVzdHM6IHRydWUsXG4gICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICAgICAgcm9va0Nhc3RsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlbW92YWJsZToge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dEZXN0czogdHJ1ZSxcbiAgICAgICAgICAgIGNhc3RsZTogdHJ1ZSxcbiAgICAgICAgICAgIGV2ZW50czoge30sXG4gICAgICAgIH0sXG4gICAgICAgIHByZWRyb3BwYWJsZToge1xuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICB9LFxuICAgICAgICBkcmFnZ2FibGU6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBkaXN0YW5jZTogMyxcbiAgICAgICAgICAgIGF1dG9EaXN0YW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dHaG9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGRlbGV0ZU9uRHJvcE9mZjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGRyb3Btb2RlOiB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RhYmxlOiB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgLy8gb24gdG91Y2hzY3JlZW4sIGRlZmF1bHQgdG8gXCJ0YXAtdGFwXCIgbW92ZXNcbiAgICAgICAgICAgIC8vIGluc3RlYWQgb2YgZHJhZ1xuICAgICAgICAgICAgZHJhZ2dlZDogISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpLFxuICAgICAgICB9LFxuICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICBkcmF3YWJsZToge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBkZWZhdWx0U25hcFRvVmFsaWRNb3ZlOiB0cnVlLFxuICAgICAgICAgICAgZXJhc2VPbkNsaWNrOiB0cnVlLFxuICAgICAgICAgICAgc2hhcGVzOiBbXSxcbiAgICAgICAgICAgIGF1dG9TaGFwZXM6IFtdLFxuICAgICAgICAgICAgYnJ1c2hlczoge1xuICAgICAgICAgICAgICAgIGdyZWVuOiB7IGtleTogJ2cnLCBjb2xvcjogJyMxNTc4MUInLCBvcGFjaXR5OiAxLCBsaW5lV2lkdGg6IDEwIH0sXG4gICAgICAgICAgICAgICAgcmVkOiB7IGtleTogJ3InLCBjb2xvcjogJyM4ODIwMjAnLCBvcGFjaXR5OiAxLCBsaW5lV2lkdGg6IDEwIH0sXG4gICAgICAgICAgICAgICAgYmx1ZTogeyBrZXk6ICdiJywgY29sb3I6ICcjMDAzMDg4Jywgb3BhY2l0eTogMSwgbGluZVdpZHRoOiAxMCB9LFxuICAgICAgICAgICAgICAgIHllbGxvdzogeyBrZXk6ICd5JywgY29sb3I6ICcjZTY4ZjAwJywgb3BhY2l0eTogMSwgbGluZVdpZHRoOiAxMCB9LFxuICAgICAgICAgICAgICAgIHBhbGVCbHVlOiB7IGtleTogJ3BiJywgY29sb3I6ICcjMDAzMDg4Jywgb3BhY2l0eTogMC40LCBsaW5lV2lkdGg6IDE1IH0sXG4gICAgICAgICAgICAgICAgcGFsZUdyZWVuOiB7IGtleTogJ3BnJywgY29sb3I6ICcjMTU3ODFCJywgb3BhY2l0eTogMC40LCBsaW5lV2lkdGg6IDE1IH0sXG4gICAgICAgICAgICAgICAgcGFsZVJlZDogeyBrZXk6ICdwcicsIGNvbG9yOiAnIzg4MjAyMCcsIG9wYWNpdHk6IDAuNCwgbGluZVdpZHRoOiAxNSB9LFxuICAgICAgICAgICAgICAgIHBhbGVHcmV5OiB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ3BncicsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzRhNGE0YScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMzUsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMTUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2U3ZnSGFzaDogJycsXG4gICAgICAgIH0sXG4gICAgICAgIGhvbGQ6IHRpbWVyKCksXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcCIsIi8vIGFwcGVuZCBhbmQgcmVtb3ZlIG9ubHkuIE5vIHVwZGF0ZXMuXG5leHBvcnQgZnVuY3Rpb24gc3luY1NoYXBlcyhzaGFwZXMsIHJvb3QsIHJlbmRlclNoYXBlKSB7XG4gICAgY29uc3QgaGFzaGVzSW5Eb20gPSBuZXcgTWFwKCksIC8vIGJ5IGhhc2hcbiAgICB0b1JlbW92ZSA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2Mgb2Ygc2hhcGVzKVxuICAgICAgICBoYXNoZXNJbkRvbS5zZXQoc2MuaGFzaCwgZmFsc2UpO1xuICAgIGxldCBlbCA9IHJvb3QuZmlyc3RDaGlsZCwgZWxIYXNoO1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgICBlbEhhc2ggPSBlbC5nZXRBdHRyaWJ1dGUoJ2NnSGFzaCcpO1xuICAgICAgICAvLyBmb3VuZCBhIHNoYXBlIGVsZW1lbnQgdGhhdCdzIGhlcmUgdG8gc3RheVxuICAgICAgICBpZiAoaGFzaGVzSW5Eb20uaGFzKGVsSGFzaCkpXG4gICAgICAgICAgICBoYXNoZXNJbkRvbS5zZXQoZWxIYXNoLCB0cnVlKTtcbiAgICAgICAgLy8gb3IgcmVtb3ZlIGl0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRvUmVtb3ZlLnB1c2goZWwpO1xuICAgICAgICBlbCA9IGVsLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICAvLyByZW1vdmUgb2xkIHNoYXBlc1xuICAgIGZvciAoY29uc3QgZWwgb2YgdG9SZW1vdmUpXG4gICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIC8vIGluc2VydCBzaGFwZXMgdGhhdCBhcmUgbm90IHlldCBpbiBkb21cbiAgICBmb3IgKGNvbnN0IHNjIG9mIHNoYXBlcykge1xuICAgICAgICBpZiAoIWhhc2hlc0luRG9tLmdldChzYy5oYXNoKSlcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQocmVuZGVyU2hhcGUoc2MpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zeW5jLmpzLm1hcCIsImltcG9ydCB7IGtleTJwb3MgfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHsgc3luY1NoYXBlcyB9IGZyb20gJy4vc3luYy5qcyc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWdOYW1lKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdmcoc3RhdGUsIHN2ZywgY3VzdG9tU3ZnKSB7XG4gICAgY29uc3QgZCA9IHN0YXRlLmRyYXdhYmxlLCBjdXJEID0gZC5jdXJyZW50LCBjdXIgPSBjdXJEICYmIGN1ckQubW91c2VTcSA/IGN1ckQgOiB1bmRlZmluZWQsIGFycm93RGVzdHMgPSBuZXcgTWFwKCksIGJvdW5kcyA9IHN0YXRlLmRvbS5ib3VuZHMoKSwgbm9uUGllY2VBdXRvU2hhcGVzID0gZC5hdXRvU2hhcGVzLmZpbHRlcihhdXRvU2hhcGUgPT4gIWF1dG9TaGFwZS5waWVjZSk7XG4gICAgZm9yIChjb25zdCBzIG9mIGQuc2hhcGVzLmNvbmNhdChub25QaWVjZUF1dG9TaGFwZXMpLmNvbmNhdChjdXIgPyBbY3VyXSA6IFtdKSkge1xuICAgICAgICBpZiAocy5kZXN0KVxuICAgICAgICAgICAgYXJyb3dEZXN0cy5zZXQocy5kZXN0LCAoYXJyb3dEZXN0cy5nZXQocy5kZXN0KSB8fCAwKSArIDEpO1xuICAgIH1cbiAgICBjb25zdCBzaGFwZXMgPSBkLnNoYXBlcy5jb25jYXQobm9uUGllY2VBdXRvU2hhcGVzKS5tYXAoKHMpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNoYXBlOiBzLFxuICAgICAgICAgICAgY3VycmVudDogZmFsc2UsXG4gICAgICAgICAgICBoYXNoOiBzaGFwZUhhc2gocywgYXJyb3dEZXN0cywgZmFsc2UsIGJvdW5kcyksXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgaWYgKGN1cilcbiAgICAgICAgc2hhcGVzLnB1c2goe1xuICAgICAgICAgICAgc2hhcGU6IGN1cixcbiAgICAgICAgICAgIGN1cnJlbnQ6IHRydWUsXG4gICAgICAgICAgICBoYXNoOiBzaGFwZUhhc2goY3VyLCBhcnJvd0Rlc3RzLCB0cnVlLCBib3VuZHMpLFxuICAgICAgICB9KTtcbiAgICBjb25zdCBmdWxsSGFzaCA9IHNoYXBlcy5tYXAoc2MgPT4gc2MuaGFzaCkuam9pbignOycpO1xuICAgIGlmIChmdWxsSGFzaCA9PT0gc3RhdGUuZHJhd2FibGUucHJldlN2Z0hhc2gpXG4gICAgICAgIHJldHVybjtcbiAgICBzdGF0ZS5kcmF3YWJsZS5wcmV2U3ZnSGFzaCA9IGZ1bGxIYXNoO1xuICAgIC8qXG4gICAgICAtLSBET00gaGllcmFyY2h5IC0tXG4gICAgICA8c3ZnIGNsYXNzPVwiY2ctc2hhcGVzXCI+ICAgICAgKDw9IHN2ZylcbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgLi4uKGZvciBicnVzaGVzKS4uLlxuICAgICAgICA8L2RlZnM+XG4gICAgICAgIDxnPlxuICAgICAgICAgIC4uLihmb3IgYXJyb3dzIGFuZCBjaXJjbGVzKS4uLlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxzdmcgY2xhc3M9XCJjZy1jdXN0b20tc3Znc1wiPiAoPD0gY3VzdG9tU3ZnKVxuICAgICAgICA8Zz5cbiAgICAgICAgICAuLi4oZm9yIGN1c3RvbSBzdmdzKS4uLlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICAqL1xuICAgIGNvbnN0IGRlZnNFbCA9IHN2Zy5xdWVyeVNlbGVjdG9yKCdkZWZzJyk7XG4gICAgY29uc3Qgc2hhcGVzRWwgPSBzdmcucXVlcnlTZWxlY3RvcignZycpO1xuICAgIGNvbnN0IGN1c3RvbVN2Z3NFbCA9IGN1c3RvbVN2Zy5xdWVyeVNlbGVjdG9yKCdnJyk7XG4gICAgc3luY0RlZnMoZCwgc2hhcGVzLCBkZWZzRWwpO1xuICAgIHN5bmNTaGFwZXMoc2hhcGVzLmZpbHRlcihzID0+ICFzLnNoYXBlLmN1c3RvbVN2ZyksIHNoYXBlc0VsLCBzaGFwZSA9PiByZW5kZXJTaGFwZShzdGF0ZSwgc2hhcGUsIGQuYnJ1c2hlcywgYXJyb3dEZXN0cywgYm91bmRzKSk7XG4gICAgc3luY1NoYXBlcyhzaGFwZXMuZmlsdGVyKHMgPT4gcy5zaGFwZS5jdXN0b21TdmcpLCBjdXN0b21TdmdzRWwsIHNoYXBlID0+IHJlbmRlclNoYXBlKHN0YXRlLCBzaGFwZSwgZC5icnVzaGVzLCBhcnJvd0Rlc3RzLCBib3VuZHMpKTtcbn1cbi8vIGFwcGVuZCBvbmx5LiBEb24ndCB0cnkgdG8gdXBkYXRlL3JlbW92ZS5cbmZ1bmN0aW9uIHN5bmNEZWZzKGQsIHNoYXBlcywgZGVmc0VsKSB7XG4gICAgY29uc3QgYnJ1c2hlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgYnJ1c2g7XG4gICAgZm9yIChjb25zdCBzIG9mIHNoYXBlcykge1xuICAgICAgICBpZiAocy5zaGFwZS5kZXN0KSB7XG4gICAgICAgICAgICBicnVzaCA9IGQuYnJ1c2hlc1tzLnNoYXBlLmJydXNoXTtcbiAgICAgICAgICAgIGlmIChzLnNoYXBlLm1vZGlmaWVycylcbiAgICAgICAgICAgICAgICBicnVzaCA9IG1ha2VDdXN0b21CcnVzaChicnVzaCwgcy5zaGFwZS5tb2RpZmllcnMpO1xuICAgICAgICAgICAgYnJ1c2hlcy5zZXQoYnJ1c2gua2V5LCBicnVzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qga2V5c0luRG9tID0gbmV3IFNldCgpO1xuICAgIGxldCBlbCA9IGRlZnNFbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChlbCkge1xuICAgICAgICBrZXlzSW5Eb20uYWRkKGVsLmdldEF0dHJpYnV0ZSgnY2dLZXknKSk7XG4gICAgICAgIGVsID0gZWwubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW2tleSwgYnJ1c2hdIG9mIGJydXNoZXMuZW50cmllcygpKSB7XG4gICAgICAgIGlmICgha2V5c0luRG9tLmhhcyhrZXkpKVxuICAgICAgICAgICAgZGVmc0VsLmFwcGVuZENoaWxkKHJlbmRlck1hcmtlcihicnVzaCkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNoYXBlSGFzaCh7IG9yaWcsIGRlc3QsIGJydXNoLCBwaWVjZSwgbW9kaWZpZXJzLCBjdXN0b21TdmcgfSwgYXJyb3dEZXN0cywgY3VycmVudCwgYm91bmRzKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgYm91bmRzLndpZHRoLFxuICAgICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICAgICBjdXJyZW50LFxuICAgICAgICBvcmlnLFxuICAgICAgICBkZXN0LFxuICAgICAgICBicnVzaCxcbiAgICAgICAgZGVzdCAmJiAoYXJyb3dEZXN0cy5nZXQoZGVzdCkgfHwgMCkgPiAxLFxuICAgICAgICBwaWVjZSAmJiBwaWVjZUhhc2gocGllY2UpLFxuICAgICAgICBtb2RpZmllcnMgJiYgbW9kaWZpZXJzSGFzaChtb2RpZmllcnMpLFxuICAgICAgICBjdXN0b21TdmcgJiYgY3VzdG9tU3ZnSGFzaChjdXN0b21TdmcpLFxuICAgIF1cbiAgICAgICAgLmZpbHRlcih4ID0+IHgpXG4gICAgICAgIC5qb2luKCcsJyk7XG59XG5mdW5jdGlvbiBwaWVjZUhhc2gocGllY2UpIHtcbiAgICByZXR1cm4gW3BpZWNlLmNvbG9yLCBwaWVjZS5yb2xlLCBwaWVjZS5zY2FsZV0uZmlsdGVyKHggPT4geCkuam9pbignLCcpO1xufVxuZnVuY3Rpb24gbW9kaWZpZXJzSGFzaChtKSB7XG4gICAgcmV0dXJuICcnICsgKG0ubGluZVdpZHRoIHx8ICcnKTtcbn1cbmZ1bmN0aW9uIGN1c3RvbVN2Z0hhc2gocykge1xuICAgIC8vIFJvbGxpbmcgaGFzaCB3aXRoIGJhc2UgMzEgKGNmLiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83NjE2NDYxL2dlbmVyYXRlLWEtaGFzaC1mcm9tLXN0cmluZy1pbi1qYXZhc2NyaXB0KVxuICAgIGxldCBoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaCA9ICgoaCA8PCA1KSAtIGggKyBzLmNoYXJDb2RlQXQoaSkpID4+PiAwO1xuICAgIH1cbiAgICByZXR1cm4gJ2N1c3RvbS0nICsgaC50b1N0cmluZygpO1xufVxuZnVuY3Rpb24gcmVuZGVyU2hhcGUoc3RhdGUsIHsgc2hhcGUsIGN1cnJlbnQsIGhhc2ggfSwgYnJ1c2hlcywgYXJyb3dEZXN0cywgYm91bmRzKSB7XG4gICAgbGV0IGVsO1xuICAgIGNvbnN0IG9yaWcgPSBvcmllbnQoa2V5MnBvcyhzaGFwZS5vcmlnKSwgc3RhdGUub3JpZW50YXRpb24pO1xuICAgIGlmIChzaGFwZS5jdXN0b21TdmcpIHtcbiAgICAgICAgZWwgPSByZW5kZXJDdXN0b21Tdmcoc2hhcGUuY3VzdG9tU3ZnLCBvcmlnLCBib3VuZHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHNoYXBlLmRlc3QpIHtcbiAgICAgICAgICAgIGxldCBicnVzaCA9IGJydXNoZXNbc2hhcGUuYnJ1c2hdO1xuICAgICAgICAgICAgaWYgKHNoYXBlLm1vZGlmaWVycylcbiAgICAgICAgICAgICAgICBicnVzaCA9IG1ha2VDdXN0b21CcnVzaChicnVzaCwgc2hhcGUubW9kaWZpZXJzKTtcbiAgICAgICAgICAgIGVsID0gcmVuZGVyQXJyb3coYnJ1c2gsIG9yaWcsIG9yaWVudChrZXkycG9zKHNoYXBlLmRlc3QpLCBzdGF0ZS5vcmllbnRhdGlvbiksIGN1cnJlbnQsIChhcnJvd0Rlc3RzLmdldChzaGFwZS5kZXN0KSB8fCAwKSA+IDEsIGJvdW5kcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWwgPSByZW5kZXJDaXJjbGUoYnJ1c2hlc1tzaGFwZS5icnVzaF0sIG9yaWcsIGN1cnJlbnQsIGJvdW5kcyk7XG4gICAgfVxuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2dIYXNoJywgaGFzaCk7XG4gICAgcmV0dXJuIGVsO1xufVxuZnVuY3Rpb24gcmVuZGVyQ3VzdG9tU3ZnKGN1c3RvbVN2ZywgcG9zLCBib3VuZHMpIHtcbiAgICBjb25zdCBbeCwgeV0gPSBwb3MydXNlcihwb3MsIGJvdW5kcyk7XG4gICAgLy8gVHJhbnNsYXRlIHRvIHRvcC1sZWZ0IG9mIGBvcmlnYCBzcXVhcmVcbiAgICBjb25zdCBnID0gc2V0QXR0cmlidXRlcyhjcmVhdGVFbGVtZW50KCdnJyksIHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7eH0sJHt5fSlgIH0pO1xuICAgIC8vIEdpdmUgMTAweDEwMCBjb29yZGluYXRlIHN5c3RlbSB0byB0aGUgdXNlciBmb3IgYG9yaWdgIHNxdWFyZVxuICAgIGNvbnN0IHN2ZyA9IHNldEF0dHJpYnV0ZXMoY3JlYXRlRWxlbWVudCgnc3ZnJyksIHsgd2lkdGg6IDEsIGhlaWdodDogMSwgdmlld0JveDogJzAgMCAxMDAgMTAwJyB9KTtcbiAgICBnLmFwcGVuZENoaWxkKHN2Zyk7XG4gICAgc3ZnLmlubmVySFRNTCA9IGN1c3RvbVN2ZztcbiAgICByZXR1cm4gZztcbn1cbmZ1bmN0aW9uIHJlbmRlckNpcmNsZShicnVzaCwgcG9zLCBjdXJyZW50LCBib3VuZHMpIHtcbiAgICBjb25zdCBvID0gcG9zMnVzZXIocG9zLCBib3VuZHMpLCB3aWR0aHMgPSBjaXJjbGVXaWR0aCgpLCByYWRpdXMgPSAoYm91bmRzLndpZHRoICsgYm91bmRzLmhlaWdodCkgLyAoNCAqIE1hdGgubWF4KGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCkpO1xuICAgIHJldHVybiBzZXRBdHRyaWJ1dGVzKGNyZWF0ZUVsZW1lbnQoJ2NpcmNsZScpLCB7XG4gICAgICAgIHN0cm9rZTogYnJ1c2guY29sb3IsXG4gICAgICAgICdzdHJva2Utd2lkdGgnOiB3aWR0aHNbY3VycmVudCA/IDAgOiAxXSxcbiAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5KGJydXNoLCBjdXJyZW50KSxcbiAgICAgICAgY3g6IG9bMF0sXG4gICAgICAgIGN5OiBvWzFdLFxuICAgICAgICByOiByYWRpdXMgLSB3aWR0aHNbMV0gLyAyLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyQXJyb3coYnJ1c2gsIG9yaWcsIGRlc3QsIGN1cnJlbnQsIHNob3J0ZW4sIGJvdW5kcykge1xuICAgIGNvbnN0IG0gPSBhcnJvd01hcmdpbihzaG9ydGVuICYmICFjdXJyZW50KSwgYSA9IHBvczJ1c2VyKG9yaWcsIGJvdW5kcyksIGIgPSBwb3MydXNlcihkZXN0LCBib3VuZHMpLCBkeCA9IGJbMF0gLSBhWzBdLCBkeSA9IGJbMV0gLSBhWzFdLCBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KSwgeG8gPSBNYXRoLmNvcyhhbmdsZSkgKiBtLCB5byA9IE1hdGguc2luKGFuZ2xlKSAqIG07XG4gICAgcmV0dXJuIHNldEF0dHJpYnV0ZXMoY3JlYXRlRWxlbWVudCgnbGluZScpLCB7XG4gICAgICAgIHN0cm9rZTogYnJ1c2guY29sb3IsXG4gICAgICAgICdzdHJva2Utd2lkdGgnOiBsaW5lV2lkdGgoYnJ1c2gsIGN1cnJlbnQpLFxuICAgICAgICAnc3Ryb2tlLWxpbmVjYXAnOiAncm91bmQnLFxuICAgICAgICAnbWFya2VyLWVuZCc6ICd1cmwoI2Fycm93aGVhZC0nICsgYnJ1c2gua2V5ICsgJyknLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5KGJydXNoLCBjdXJyZW50KSxcbiAgICAgICAgeDE6IGFbMF0sXG4gICAgICAgIHkxOiBhWzFdLFxuICAgICAgICB4MjogYlswXSAtIHhvLFxuICAgICAgICB5MjogYlsxXSAtIHlvLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyTWFya2VyKGJydXNoKSB7XG4gICAgY29uc3QgbWFya2VyID0gc2V0QXR0cmlidXRlcyhjcmVhdGVFbGVtZW50KCdtYXJrZXInKSwge1xuICAgICAgICBpZDogJ2Fycm93aGVhZC0nICsgYnJ1c2gua2V5LFxuICAgICAgICBvcmllbnQ6ICdhdXRvJyxcbiAgICAgICAgbWFya2VyV2lkdGg6IDQsXG4gICAgICAgIG1hcmtlckhlaWdodDogOCxcbiAgICAgICAgcmVmWDogMi4wNSxcbiAgICAgICAgcmVmWTogMi4wMSxcbiAgICB9KTtcbiAgICBtYXJrZXIuYXBwZW5kQ2hpbGQoc2V0QXR0cmlidXRlcyhjcmVhdGVFbGVtZW50KCdwYXRoJyksIHtcbiAgICAgICAgZDogJ00wLDAgVjQgTDMsMiBaJyxcbiAgICAgICAgZmlsbDogYnJ1c2guY29sb3IsXG4gICAgfSkpO1xuICAgIG1hcmtlci5zZXRBdHRyaWJ1dGUoJ2NnS2V5JywgYnJ1c2gua2V5KTtcbiAgICByZXR1cm4gbWFya2VyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoZWwsIGF0dHJzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIHJldHVybiBlbDtcbn1cbmZ1bmN0aW9uIG9yaWVudChwb3MsIGNvbG9yKSB7XG4gICAgcmV0dXJuIGNvbG9yID09PSAnd2hpdGUnID8gcG9zIDogWzcgLSBwb3NbMF0sIDcgLSBwb3NbMV1dO1xufVxuZnVuY3Rpb24gbWFrZUN1c3RvbUJydXNoKGJhc2UsIG1vZGlmaWVycykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbG9yOiBiYXNlLmNvbG9yLFxuICAgICAgICBvcGFjaXR5OiBNYXRoLnJvdW5kKGJhc2Uub3BhY2l0eSAqIDEwKSAvIDEwLFxuICAgICAgICBsaW5lV2lkdGg6IE1hdGgucm91bmQobW9kaWZpZXJzLmxpbmVXaWR0aCB8fCBiYXNlLmxpbmVXaWR0aCksXG4gICAgICAgIGtleTogW2Jhc2Uua2V5LCBtb2RpZmllcnMubGluZVdpZHRoXS5maWx0ZXIoeCA9PiB4KS5qb2luKCcnKSxcbiAgICB9O1xufVxuZnVuY3Rpb24gY2lyY2xlV2lkdGgoKSB7XG4gICAgcmV0dXJuIFszIC8gNjQsIDQgLyA2NF07XG59XG5mdW5jdGlvbiBsaW5lV2lkdGgoYnJ1c2gsIGN1cnJlbnQpIHtcbiAgICByZXR1cm4gKChicnVzaC5saW5lV2lkdGggfHwgMTApICogKGN1cnJlbnQgPyAwLjg1IDogMSkpIC8gNjQ7XG59XG5mdW5jdGlvbiBvcGFjaXR5KGJydXNoLCBjdXJyZW50KSB7XG4gICAgcmV0dXJuIChicnVzaC5vcGFjaXR5IHx8IDEpICogKGN1cnJlbnQgPyAwLjkgOiAxKTtcbn1cbmZ1bmN0aW9uIGFycm93TWFyZ2luKHNob3J0ZW4pIHtcbiAgICByZXR1cm4gKHNob3J0ZW4gPyAyMCA6IDEwKSAvIDY0O1xufVxuZnVuY3Rpb24gcG9zMnVzZXIocG9zLCBib3VuZHMpIHtcbiAgICBjb25zdCB4U2NhbGUgPSBNYXRoLm1pbigxLCBib3VuZHMud2lkdGggLyBib3VuZHMuaGVpZ2h0KTtcbiAgICBjb25zdCB5U2NhbGUgPSBNYXRoLm1pbigxLCBib3VuZHMuaGVpZ2h0IC8gYm91bmRzLndpZHRoKTtcbiAgICByZXR1cm4gWyhwb3NbMF0gLSAzLjUpICogeFNjYWxlLCAoMy41IC0gcG9zWzFdKSAqIHlTY2FsZV07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdmcuanMubWFwIiwiaW1wb3J0IHsgc2V0VmlzaWJsZSwgY3JlYXRlRWwgfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHsgY29sb3JzLCBmaWxlcywgcmFua3MgfSBmcm9tICcuL3R5cGVzLmpzJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgYXMgY3JlYXRlU1ZHLCBzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi9zdmcuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldyYXAoZWxlbWVudCwgcykge1xuICAgIC8vIC5jZy13cmFwIChlbGVtZW50IHBhc3NlZCB0byBDaGVzc2dyb3VuZClcbiAgICAvLyAgIGNnLWNvbnRhaW5lclxuICAgIC8vICAgICBjZy1ib2FyZFxuICAgIC8vICAgICBzdmcuY2ctc2hhcGVzXG4gICAgLy8gICAgICAgZGVmc1xuICAgIC8vICAgICAgIGdcbiAgICAvLyAgICAgc3ZnLmNnLWN1c3RvbS1zdmdzXG4gICAgLy8gICAgICAgZ1xuICAgIC8vICAgICBjZy1hdXRvLXBpZWNlc1xuICAgIC8vICAgICBjb29yZHMucmFua3NcbiAgICAvLyAgICAgY29vcmRzLmZpbGVzXG4gICAgLy8gICAgIHBpZWNlLmdob3N0XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBlbnN1cmUgdGhlIGNnLXdyYXAgY2xhc3MgaXMgc2V0XG4gICAgLy8gc28gYm91bmRzIGNhbGN1bGF0aW9uIGNhbiB1c2UgdGhlIENTUyB3aWR0aC9oZWlnaHQgdmFsdWVzXG4gICAgLy8gYWRkIHRoYXQgY2xhc3MgeW91cnNlbGYgdG8gdGhlIGVsZW1lbnQgYmVmb3JlIGNhbGxpbmcgY2hlc3Nncm91bmRcbiAgICAvLyBmb3IgYSBzbGlnaHQgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQhIChhdm9pZHMgcmVjb21wdXRpbmcgc3R5bGUpXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjZy13cmFwJyk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbG9ycylcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcmllbnRhdGlvbi0nICsgYywgcy5vcmllbnRhdGlvbiA9PT0gYyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtYW5pcHVsYWJsZScsICFzLnZpZXdPbmx5KTtcbiAgICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVFbCgnY2ctY29udGFpbmVyJyk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIGNvbnN0IGJvYXJkID0gY3JlYXRlRWwoJ2NnLWJvYXJkJyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICBsZXQgc3ZnO1xuICAgIGxldCBjdXN0b21Tdmc7XG4gICAgbGV0IGF1dG9QaWVjZXM7XG4gICAgaWYgKHMuZHJhd2FibGUudmlzaWJsZSkge1xuICAgICAgICBzdmcgPSBzZXRBdHRyaWJ1dGVzKGNyZWF0ZVNWRygnc3ZnJyksIHtcbiAgICAgICAgICAgIGNsYXNzOiAnY2ctc2hhcGVzJyxcbiAgICAgICAgICAgIHZpZXdCb3g6ICctNCAtNCA4IDgnLFxuICAgICAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogJ3hNaWRZTWlkIHNsaWNlJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChjcmVhdGVTVkcoJ2RlZnMnKSk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChjcmVhdGVTVkcoJ2cnKSk7XG4gICAgICAgIGN1c3RvbVN2ZyA9IHNldEF0dHJpYnV0ZXMoY3JlYXRlU1ZHKCdzdmcnKSwge1xuICAgICAgICAgICAgY2xhc3M6ICdjZy1jdXN0b20tc3ZncycsXG4gICAgICAgICAgICB2aWV3Qm94OiAnLTMuNSAtMy41IDggOCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAneE1pZFlNaWQgc2xpY2UnLFxuICAgICAgICB9KTtcbiAgICAgICAgY3VzdG9tU3ZnLmFwcGVuZENoaWxkKGNyZWF0ZVNWRygnZycpKTtcbiAgICAgICAgYXV0b1BpZWNlcyA9IGNyZWF0ZUVsKCdjZy1hdXRvLXBpZWNlcycpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGN1c3RvbVN2Zyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhdXRvUGllY2VzKTtcbiAgICB9XG4gICAgaWYgKHMuY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc3Qgb3JpZW50Q2xhc3MgPSBzLm9yaWVudGF0aW9uID09PSAnYmxhY2snID8gJyBibGFjaycgOiAnJztcbiAgICAgICAgY29uc3QgcmFua3NQb3NpdGlvbkNsYXNzID0gcy5yYW5rc1Bvc2l0aW9uID09PSAnbGVmdCcgPyAnIGxlZnQnIDogJyc7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJDb29yZHMocmFua3MsICdyYW5rcycgKyBvcmllbnRDbGFzcyArIHJhbmtzUG9zaXRpb25DbGFzcykpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyQ29vcmRzKGZpbGVzLCAnZmlsZXMnICsgb3JpZW50Q2xhc3MpKTtcbiAgICB9XG4gICAgbGV0IGdob3N0O1xuICAgIGlmIChzLmRyYWdnYWJsZS5zaG93R2hvc3QpIHtcbiAgICAgICAgZ2hvc3QgPSBjcmVhdGVFbCgncGllY2UnLCAnZ2hvc3QnKTtcbiAgICAgICAgc2V0VmlzaWJsZShnaG9zdCwgZmFsc2UpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2hvc3QpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBib2FyZCxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3cmFwOiBlbGVtZW50LFxuICAgICAgICBnaG9zdCxcbiAgICAgICAgc3ZnLFxuICAgICAgICBjdXN0b21TdmcsXG4gICAgICAgIGF1dG9QaWVjZXMsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlbmRlckNvb3JkcyhlbGVtcywgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZWwgPSBjcmVhdGVFbCgnY29vcmRzJywgY2xhc3NOYW1lKTtcbiAgICBsZXQgZjtcbiAgICBmb3IgKGNvbnN0IGVsZW0gb2YgZWxlbXMpIHtcbiAgICAgICAgZiA9IGNyZWF0ZUVsKCdjb29yZCcpO1xuICAgICAgICBmLnRleHRDb250ZW50ID0gZWxlbTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZik7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdyYXAuanMubWFwIiwiaW1wb3J0ICogYXMgYm9hcmQgZnJvbSAnLi9ib2FyZC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgeyBjYW5jZWwgYXMgZHJhZ0NhbmNlbCB9IGZyb20gJy4vZHJhZy5qcyc7XG5leHBvcnQgZnVuY3Rpb24gc2V0RHJvcE1vZGUocywgcGllY2UpIHtcbiAgICBzLmRyb3Btb2RlID0ge1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIHBpZWNlLFxuICAgIH07XG4gICAgZHJhZ0NhbmNlbChzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxEcm9wTW9kZShzKSB7XG4gICAgcy5kcm9wbW9kZSA9IHtcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyb3AocywgZSkge1xuICAgIGlmICghcy5kcm9wbW9kZS5hY3RpdmUpXG4gICAgICAgIHJldHVybjtcbiAgICBib2FyZC51bnNldFByZW1vdmUocyk7XG4gICAgYm9hcmQudW5zZXRQcmVkcm9wKHMpO1xuICAgIGNvbnN0IHBpZWNlID0gcy5kcm9wbW9kZS5waWVjZTtcbiAgICBpZiAocGllY2UpIHtcbiAgICAgICAgcy5waWVjZXMuc2V0KCdhMCcsIHBpZWNlKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB1dGlsLmV2ZW50UG9zaXRpb24oZSk7XG4gICAgICAgIGNvbnN0IGRlc3QgPSBwb3NpdGlvbiAmJiBib2FyZC5nZXRLZXlBdERvbVBvcyhwb3NpdGlvbiwgYm9hcmQud2hpdGVQb3YocyksIHMuZG9tLmJvdW5kcygpKTtcbiAgICAgICAgaWYgKGRlc3QpXG4gICAgICAgICAgICBib2FyZC5kcm9wTmV3UGllY2UocywgJ2EwJywgZGVzdCk7XG4gICAgfVxuICAgIHMuZG9tLnJlZHJhdygpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJvcC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBkcmFnIGZyb20gJy4vZHJhZy5qcyc7XG5pbXBvcnQgKiBhcyBkcmF3IGZyb20gJy4vZHJhdy5qcyc7XG5pbXBvcnQgeyBkcm9wIH0gZnJvbSAnLi9kcm9wLmpzJztcbmltcG9ydCB7IGlzUmlnaHRCdXR0b24gfSBmcm9tICcuL3V0aWwuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRCb2FyZChzLCBvblJlc2l6ZSkge1xuICAgIGNvbnN0IGJvYXJkRWwgPSBzLmRvbS5lbGVtZW50cy5ib2FyZDtcbiAgICBpZiAoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpXG4gICAgICAgIG5ldyBSZXNpemVPYnNlcnZlcihvblJlc2l6ZSkub2JzZXJ2ZShzLmRvbS5lbGVtZW50cy53cmFwKTtcbiAgICBpZiAocy52aWV3T25seSlcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIENhbm5vdCBiZSBwYXNzaXZlLCBiZWNhdXNlIHdlIHByZXZlbnQgdG91Y2ggc2Nyb2xsaW5nIGFuZCBkcmFnZ2luZyBvZlxuICAgIC8vIHNlbGVjdGVkIGVsZW1lbnRzLlxuICAgIGNvbnN0IG9uU3RhcnQgPSBzdGFydERyYWdPckRyYXcocyk7XG4gICAgYm9hcmRFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25TdGFydCwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBib2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uU3RhcnQsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgaWYgKHMuZGlzYWJsZUNvbnRleHRNZW51IHx8IHMuZHJhd2FibGUuZW5hYmxlZCkge1xuICAgICAgICBib2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgIH1cbn1cbi8vIHJldHVybnMgdGhlIHVuYmluZCBmdW5jdGlvblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmREb2N1bWVudChzLCBvblJlc2l6ZSkge1xuICAgIGNvbnN0IHVuYmluZHMgPSBbXTtcbiAgICAvLyBPbGQgdmVyc2lvbnMgb2YgRWRnZSBhbmQgU2FmYXJpIGRvIG5vdCBzdXBwb3J0IFJlc2l6ZU9ic2VydmVyLiBTZW5kXG4gICAgLy8gY2hlc3Nncm91bmQucmVzaXplIGlmIGEgdXNlciBhY3Rpb24gaGFzIGNoYW5nZWQgdGhlIGJvdW5kcyBvZiB0aGUgYm9hcmQuXG4gICAgaWYgKCEoJ1Jlc2l6ZU9ic2VydmVyJyBpbiB3aW5kb3cpKVxuICAgICAgICB1bmJpbmRzLnB1c2godW5iaW5kYWJsZShkb2N1bWVudC5ib2R5LCAnY2hlc3Nncm91bmQucmVzaXplJywgb25SZXNpemUpKTtcbiAgICBpZiAoIXMudmlld09ubHkpIHtcbiAgICAgICAgY29uc3Qgb25tb3ZlID0gZHJhZ09yRHJhdyhzLCBkcmFnLm1vdmUsIGRyYXcubW92ZSk7XG4gICAgICAgIGNvbnN0IG9uZW5kID0gZHJhZ09yRHJhdyhzLCBkcmFnLmVuZCwgZHJhdy5lbmQpO1xuICAgICAgICBmb3IgKGNvbnN0IGV2IG9mIFsndG91Y2htb3ZlJywgJ21vdXNlbW92ZSddKVxuICAgICAgICAgICAgdW5iaW5kcy5wdXNoKHVuYmluZGFibGUoZG9jdW1lbnQsIGV2LCBvbm1vdmUpKTtcbiAgICAgICAgZm9yIChjb25zdCBldiBvZiBbJ3RvdWNoZW5kJywgJ21vdXNldXAnXSlcbiAgICAgICAgICAgIHVuYmluZHMucHVzaCh1bmJpbmRhYmxlKGRvY3VtZW50LCBldiwgb25lbmQpKTtcbiAgICAgICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBzLmRvbS5ib3VuZHMuY2xlYXIoKTtcbiAgICAgICAgdW5iaW5kcy5wdXNoKHVuYmluZGFibGUoZG9jdW1lbnQsICdzY3JvbGwnLCBvblNjcm9sbCwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pKTtcbiAgICAgICAgdW5iaW5kcy5wdXNoKHVuYmluZGFibGUod2luZG93LCAncmVzaXplJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB1bmJpbmRzLmZvckVhY2goZiA9PiBmKCkpO1xufVxuZnVuY3Rpb24gdW5iaW5kYWJsZShlbCwgZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBzdGFydERyYWdPckRyYXcocykge1xuICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgaWYgKHMuZHJhZ2dhYmxlLmN1cnJlbnQpXG4gICAgICAgICAgICBkcmFnLmNhbmNlbChzKTtcbiAgICAgICAgZWxzZSBpZiAocy5kcmF3YWJsZS5jdXJyZW50KVxuICAgICAgICAgICAgZHJhdy5jYW5jZWwocyk7XG4gICAgICAgIGVsc2UgaWYgKGUuc2hpZnRLZXkgfHwgaXNSaWdodEJ1dHRvbihlKSkge1xuICAgICAgICAgICAgaWYgKHMuZHJhd2FibGUuZW5hYmxlZClcbiAgICAgICAgICAgICAgICBkcmF3LnN0YXJ0KHMsIGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFzLnZpZXdPbmx5KSB7XG4gICAgICAgICAgICBpZiAocy5kcm9wbW9kZS5hY3RpdmUpXG4gICAgICAgICAgICAgICAgZHJvcChzLCBlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkcmFnLnN0YXJ0KHMsIGUpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGRyYWdPckRyYXcocywgd2l0aERyYWcsIHdpdGhEcmF3KSB7XG4gICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICBpZiAocy5kcmF3YWJsZS5jdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAocy5kcmF3YWJsZS5lbmFibGVkKVxuICAgICAgICAgICAgICAgIHdpdGhEcmF3KHMsIGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFzLnZpZXdPbmx5KVxuICAgICAgICAgICAgd2l0aERyYWcocywgZSk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJpbXBvcnQgeyBrZXkycG9zLCBjcmVhdGVFbCwgcG9zVG9UcmFuc2xhdGUgYXMgcG9zVG9UcmFuc2xhdGVGcm9tQm91bmRzLCB0cmFuc2xhdGUgfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHsgd2hpdGVQb3YgfSBmcm9tICcuL2JvYXJkLmpzJztcbi8vIHBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92ZWxvY2UvbGljaG9iaWxlL2Jsb2IvbWFzdGVyL3NyYy9qcy9jaGVzc2dyb3VuZC92aWV3LmpzXG4vLyBpbiBjYXNlIG9mIGJ1Z3MsIGJsYW1lIEB2ZWxvY2VcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIocykge1xuICAgIGNvbnN0IGFzV2hpdGUgPSB3aGl0ZVBvdihzKSwgcG9zVG9UcmFuc2xhdGUgPSBwb3NUb1RyYW5zbGF0ZUZyb21Cb3VuZHMocy5kb20uYm91bmRzKCkpLCBib2FyZEVsID0gcy5kb20uZWxlbWVudHMuYm9hcmQsIHBpZWNlcyA9IHMucGllY2VzLCBjdXJBbmltID0gcy5hbmltYXRpb24uY3VycmVudCwgYW5pbXMgPSBjdXJBbmltID8gY3VyQW5pbS5wbGFuLmFuaW1zIDogbmV3IE1hcCgpLCBmYWRpbmdzID0gY3VyQW5pbSA/IGN1ckFuaW0ucGxhbi5mYWRpbmdzIDogbmV3IE1hcCgpLCBjdXJEcmFnID0gcy5kcmFnZ2FibGUuY3VycmVudCwgc3F1YXJlcyA9IGNvbXB1dGVTcXVhcmVDbGFzc2VzKHMpLCBzYW1lUGllY2VzID0gbmV3IFNldCgpLCBzYW1lU3F1YXJlcyA9IG5ldyBTZXQoKSwgbW92ZWRQaWVjZXMgPSBuZXcgTWFwKCksIG1vdmVkU3F1YXJlcyA9IG5ldyBNYXAoKTsgLy8gYnkgY2xhc3MgbmFtZVxuICAgIGxldCBrLCBlbCwgcGllY2VBdEtleSwgZWxQaWVjZU5hbWUsIGFuaW0sIGZhZGluZywgcE12ZHNldCwgcE12ZCwgc012ZHNldCwgc012ZDtcbiAgICAvLyB3YWxrIG92ZXIgYWxsIGJvYXJkIGRvbSBlbGVtZW50cywgYXBwbHkgYW5pbWF0aW9ucyBhbmQgZmxhZyBtb3ZlZCBwaWVjZXNcbiAgICBlbCA9IGJvYXJkRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgayA9IGVsLmNnS2V5O1xuICAgICAgICBpZiAoaXNQaWVjZU5vZGUoZWwpKSB7XG4gICAgICAgICAgICBwaWVjZUF0S2V5ID0gcGllY2VzLmdldChrKTtcbiAgICAgICAgICAgIGFuaW0gPSBhbmltcy5nZXQoayk7XG4gICAgICAgICAgICBmYWRpbmcgPSBmYWRpbmdzLmdldChrKTtcbiAgICAgICAgICAgIGVsUGllY2VOYW1lID0gZWwuY2dQaWVjZTtcbiAgICAgICAgICAgIC8vIGlmIHBpZWNlIG5vdCBiZWluZyBkcmFnZ2VkIGFueW1vcmUsIHJlbW92ZSBkcmFnZ2luZyBzdHlsZVxuICAgICAgICAgICAgaWYgKGVsLmNnRHJhZ2dpbmcgJiYgKCFjdXJEcmFnIHx8IGN1ckRyYWcub3JpZyAhPT0gaykpIHtcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZShlbCwgcG9zVG9UcmFuc2xhdGUoa2V5MnBvcyhrKSwgYXNXaGl0ZSkpO1xuICAgICAgICAgICAgICAgIGVsLmNnRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlbW92ZSBmYWRpbmcgY2xhc3MgaWYgaXQgc3RpbGwgcmVtYWluc1xuICAgICAgICAgICAgaWYgKCFmYWRpbmcgJiYgZWwuY2dGYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBlbC5jZ0ZhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm93IGEgcGllY2UgYXQgdGhpcyBkb20ga2V5XG4gICAgICAgICAgICBpZiAocGllY2VBdEtleSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlIGFuaW1hdGlvbiBpZiBhbHJlYWR5IGFuaW1hdGluZyBhbmQgc2FtZSBwaWVjZVxuICAgICAgICAgICAgICAgIC8vIChvdGhlcndpc2UgaXQgY291bGQgYW5pbWF0ZSBhIGNhcHR1cmVkIHBpZWNlKVxuICAgICAgICAgICAgICAgIGlmIChhbmltICYmIGVsLmNnQW5pbWF0aW5nICYmIGVsUGllY2VOYW1lID09PSBwaWVjZU5hbWVPZihwaWVjZUF0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBrZXkycG9zKGspO1xuICAgICAgICAgICAgICAgICAgICBwb3NbMF0gKz0gYW5pbVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcG9zWzFdICs9IGFuaW1bM107XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FuaW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKGVsLCBwb3NUb1RyYW5zbGF0ZShwb3MsIGFzV2hpdGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZWwuY2dBbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2dBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoZWwsIHBvc1RvVHJhbnNsYXRlKGtleTJwb3MoayksIGFzV2hpdGUpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuYWRkUGllY2VaSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS56SW5kZXggPSBwb3NaSW5kZXgoa2V5MnBvcyhrKSwgYXNXaGl0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHNhbWUgcGllY2U6IGZsYWcgYXMgc2FtZVxuICAgICAgICAgICAgICAgIGlmIChlbFBpZWNlTmFtZSA9PT0gcGllY2VOYW1lT2YocGllY2VBdEtleSkgJiYgKCFmYWRpbmcgfHwgIWVsLmNnRmFkaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBzYW1lUGllY2VzLmFkZChrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGlmZmVyZW50IHBpZWNlOiBmbGFnIGFzIG1vdmVkIHVubGVzcyBpdCBpcyBhIGZhZGluZyBwaWVjZVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFkaW5nICYmIGVsUGllY2VOYW1lID09PSBwaWVjZU5hbWVPZihmYWRpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdmYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNnRmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZFZhbHVlKG1vdmVkUGllY2VzLCBlbFBpZWNlTmFtZSwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm8gcGllY2U6IGZsYWcgYXMgbW92ZWRcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwcGVuZFZhbHVlKG1vdmVkUGllY2VzLCBlbFBpZWNlTmFtZSwgZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3F1YXJlTm9kZShlbCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNuID0gZWwuY2xhc3NOYW1lO1xuICAgICAgICAgICAgaWYgKHNxdWFyZXMuZ2V0KGspID09PSBjbilcbiAgICAgICAgICAgICAgICBzYW1lU3F1YXJlcy5hZGQoayk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYXBwZW5kVmFsdWUobW92ZWRTcXVhcmVzLCBjbiwgZWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsID0gZWwubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIC8vIHdhbGsgb3ZlciBhbGwgc3F1YXJlcyBpbiBjdXJyZW50IHNldCwgYXBwbHkgZG9tIGNoYW5nZXMgdG8gbW92ZWQgc3F1YXJlc1xuICAgIC8vIG9yIGFwcGVuZCBuZXcgc3F1YXJlc1xuICAgIGZvciAoY29uc3QgW3NrLCBjbGFzc05hbWVdIG9mIHNxdWFyZXMpIHtcbiAgICAgICAgaWYgKCFzYW1lU3F1YXJlcy5oYXMoc2spKSB7XG4gICAgICAgICAgICBzTXZkc2V0ID0gbW92ZWRTcXVhcmVzLmdldChjbGFzc05hbWUpO1xuICAgICAgICAgICAgc012ZCA9IHNNdmRzZXQgJiYgc012ZHNldC5wb3AoKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gcG9zVG9UcmFuc2xhdGUoa2V5MnBvcyhzayksIGFzV2hpdGUpO1xuICAgICAgICAgICAgaWYgKHNNdmQpIHtcbiAgICAgICAgICAgICAgICBzTXZkLmNnS2V5ID0gc2s7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKHNNdmQsIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZU5vZGUgPSBjcmVhdGVFbCgnc3F1YXJlJywgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICBzcXVhcmVOb2RlLmNnS2V5ID0gc2s7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKHNxdWFyZU5vZGUsIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgICAgICAgICBib2FyZEVsLmluc2VydEJlZm9yZShzcXVhcmVOb2RlLCBib2FyZEVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHdhbGsgb3ZlciBhbGwgcGllY2VzIGluIGN1cnJlbnQgc2V0LCBhcHBseSBkb20gY2hhbmdlcyB0byBtb3ZlZCBwaWVjZXNcbiAgICAvLyBvciBhcHBlbmQgbmV3IHBpZWNlc1xuICAgIGZvciAoY29uc3QgW2ssIHBdIG9mIHBpZWNlcykge1xuICAgICAgICBhbmltID0gYW5pbXMuZ2V0KGspO1xuICAgICAgICBpZiAoIXNhbWVQaWVjZXMuaGFzKGspKSB7XG4gICAgICAgICAgICBwTXZkc2V0ID0gbW92ZWRQaWVjZXMuZ2V0KHBpZWNlTmFtZU9mKHApKTtcbiAgICAgICAgICAgIHBNdmQgPSBwTXZkc2V0ICYmIHBNdmRzZXQucG9wKCk7XG4gICAgICAgICAgICAvLyBhIHNhbWUgcGllY2Ugd2FzIG1vdmVkXG4gICAgICAgICAgICBpZiAocE12ZCkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5IGRvbSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgcE12ZC5jZ0tleSA9IGs7XG4gICAgICAgICAgICAgICAgaWYgKHBNdmQuY2dGYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcE12ZC5jbGFzc0xpc3QucmVtb3ZlKCdmYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgcE12ZC5jZ0ZhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBrZXkycG9zKGspO1xuICAgICAgICAgICAgICAgIGlmIChzLmFkZFBpZWNlWkluZGV4KVxuICAgICAgICAgICAgICAgICAgICBwTXZkLnN0eWxlLnpJbmRleCA9IHBvc1pJbmRleChwb3MsIGFzV2hpdGUpO1xuICAgICAgICAgICAgICAgIGlmIChhbmltKSB7XG4gICAgICAgICAgICAgICAgICAgIHBNdmQuY2dBbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwTXZkLmNsYXNzTGlzdC5hZGQoJ2FuaW0nKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zWzBdICs9IGFuaW1bMl07XG4gICAgICAgICAgICAgICAgICAgIHBvc1sxXSArPSBhbmltWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUocE12ZCwgcG9zVG9UcmFuc2xhdGUocG9zLCBhc1doaXRlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBubyBwaWVjZSBpbiBtb3ZlZCBvYmo6IGluc2VydCB0aGUgbmV3IHBpZWNlXG4gICAgICAgICAgICAvLyBhc3N1bWVzIHRoZSBuZXcgcGllY2UgaXMgbm90IGJlaW5nIGRyYWdnZWRcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpZWNlTmFtZSA9IHBpZWNlTmFtZU9mKHApLCBwaWVjZU5vZGUgPSBjcmVhdGVFbCgncGllY2UnLCBwaWVjZU5hbWUpLCBwb3MgPSBrZXkycG9zKGspO1xuICAgICAgICAgICAgICAgIHBpZWNlTm9kZS5jZ1BpZWNlID0gcGllY2VOYW1lO1xuICAgICAgICAgICAgICAgIHBpZWNlTm9kZS5jZ0tleSA9IGs7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGllY2VOb2RlLmNnQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcG9zWzBdICs9IGFuaW1bMl07XG4gICAgICAgICAgICAgICAgICAgIHBvc1sxXSArPSBhbmltWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUocGllY2VOb2RlLCBwb3NUb1RyYW5zbGF0ZShwb3MsIGFzV2hpdGUpKTtcbiAgICAgICAgICAgICAgICBpZiAocy5hZGRQaWVjZVpJbmRleClcbiAgICAgICAgICAgICAgICAgICAgcGllY2VOb2RlLnN0eWxlLnpJbmRleCA9IHBvc1pJbmRleChwb3MsIGFzV2hpdGUpO1xuICAgICAgICAgICAgICAgIGJvYXJkRWwuYXBwZW5kQ2hpbGQocGllY2VOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyByZW1vdmUgYW55IGVsZW1lbnQgdGhhdCByZW1haW5zIGluIHRoZSBtb3ZlZCBzZXRzXG4gICAgZm9yIChjb25zdCBub2RlcyBvZiBtb3ZlZFBpZWNlcy52YWx1ZXMoKSlcbiAgICAgICAgcmVtb3ZlTm9kZXMocywgbm9kZXMpO1xuICAgIGZvciAoY29uc3Qgbm9kZXMgb2YgbW92ZWRTcXVhcmVzLnZhbHVlcygpKVxuICAgICAgICByZW1vdmVOb2RlcyhzLCBub2Rlcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUmVzaXplZChzKSB7XG4gICAgY29uc3QgYXNXaGl0ZSA9IHdoaXRlUG92KHMpLCBwb3NUb1RyYW5zbGF0ZSA9IHBvc1RvVHJhbnNsYXRlRnJvbUJvdW5kcyhzLmRvbS5ib3VuZHMoKSk7XG4gICAgbGV0IGVsID0gcy5kb20uZWxlbWVudHMuYm9hcmQuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgaWYgKChpc1BpZWNlTm9kZShlbCkgJiYgIWVsLmNnQW5pbWF0aW5nKSB8fCBpc1NxdWFyZU5vZGUoZWwpKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGUoZWwsIHBvc1RvVHJhbnNsYXRlKGtleTJwb3MoZWwuY2dLZXkpLCBhc1doaXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWwgPSBlbC5uZXh0U2libGluZztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQm91bmRzKHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSBzLmRvbS5lbGVtZW50cy53cmFwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHMuZG9tLmVsZW1lbnRzLmNvbnRhaW5lcjtcbiAgICBjb25zdCByYXRpbyA9IGJvdW5kcy5oZWlnaHQgLyBib3VuZHMud2lkdGg7XG4gICAgY29uc3Qgd2lkdGggPSAoTWF0aC5mbG9vcigoYm91bmRzLndpZHRoICogd2luZG93LmRldmljZVBpeGVsUmF0aW8pIC8gOCkgKiA4KSAvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogcmF0aW87XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIHMuZG9tLmJvdW5kcy5jbGVhcigpO1xuICAgIGlmIChzLmFkZERpbWVuc2lvbnNDc3NWYXJzKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZy13aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jZy1oZWlnaHQnLCBoZWlnaHQgKyAncHgnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc1BpZWNlTm9kZShlbCkge1xuICAgIHJldHVybiBlbC50YWdOYW1lID09PSAnUElFQ0UnO1xufVxuZnVuY3Rpb24gaXNTcXVhcmVOb2RlKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRhZ05hbWUgPT09ICdTUVVBUkUnO1xufVxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMocywgbm9kZXMpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpXG4gICAgICAgIHMuZG9tLmVsZW1lbnRzLmJvYXJkLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gcG9zWkluZGV4KHBvcywgYXNXaGl0ZSkge1xuICAgIGNvbnN0IG1pblogPSAzO1xuICAgIGNvbnN0IHJhbmsgPSBwb3NbMV07XG4gICAgY29uc3QgeiA9IGFzV2hpdGUgPyBtaW5aICsgNyAtIHJhbmsgOiBtaW5aICsgcmFuaztcbiAgICByZXR1cm4gYCR7en1gO1xufVxuZnVuY3Rpb24gcGllY2VOYW1lT2YocGllY2UpIHtcbiAgICByZXR1cm4gYCR7cGllY2UuY29sb3J9ICR7cGllY2Uucm9sZX1gO1xufVxuZnVuY3Rpb24gY29tcHV0ZVNxdWFyZUNsYXNzZXMocykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBzcXVhcmVzID0gbmV3IE1hcCgpO1xuICAgIGlmIChzLmxhc3RNb3ZlICYmIHMuaGlnaGxpZ2h0Lmxhc3RNb3ZlKVxuICAgICAgICBmb3IgKGNvbnN0IGsgb2Ygcy5sYXN0TW92ZSkge1xuICAgICAgICAgICAgYWRkU3F1YXJlKHNxdWFyZXMsIGssICdsYXN0LW1vdmUnKTtcbiAgICAgICAgfVxuICAgIGlmIChzLmNoZWNrICYmIHMuaGlnaGxpZ2h0LmNoZWNrKVxuICAgICAgICBhZGRTcXVhcmUoc3F1YXJlcywgcy5jaGVjaywgJ2NoZWNrJyk7XG4gICAgaWYgKHMuc2VsZWN0ZWQpIHtcbiAgICAgICAgYWRkU3F1YXJlKHNxdWFyZXMsIHMuc2VsZWN0ZWQsICdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAocy5tb3ZhYmxlLnNob3dEZXN0cykge1xuICAgICAgICAgICAgY29uc3QgZGVzdHMgPSAoX2EgPSBzLm1vdmFibGUuZGVzdHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQocy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBpZiAoZGVzdHMpXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrIG9mIGRlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFNxdWFyZShzcXVhcmVzLCBrLCAnbW92ZS1kZXN0JyArIChzLnBpZWNlcy5oYXMoaykgPyAnIG9jJyA6ICcnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcERlc3RzID0gcy5wcmVtb3ZhYmxlLmRlc3RzO1xuICAgICAgICAgICAgaWYgKHBEZXN0cylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGsgb2YgcERlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFNxdWFyZShzcXVhcmVzLCBrLCAncHJlbW92ZS1kZXN0JyArIChzLnBpZWNlcy5oYXMoaykgPyAnIG9jJyA6ICcnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByZW1vdmUgPSBzLnByZW1vdmFibGUuY3VycmVudDtcbiAgICBpZiAocHJlbW92ZSlcbiAgICAgICAgZm9yIChjb25zdCBrIG9mIHByZW1vdmUpXG4gICAgICAgICAgICBhZGRTcXVhcmUoc3F1YXJlcywgaywgJ2N1cnJlbnQtcHJlbW92ZScpO1xuICAgIGVsc2UgaWYgKHMucHJlZHJvcHBhYmxlLmN1cnJlbnQpXG4gICAgICAgIGFkZFNxdWFyZShzcXVhcmVzLCBzLnByZWRyb3BwYWJsZS5jdXJyZW50LmtleSwgJ2N1cnJlbnQtcHJlbW92ZScpO1xuICAgIGNvbnN0IG8gPSBzLmV4cGxvZGluZztcbiAgICBpZiAobylcbiAgICAgICAgZm9yIChjb25zdCBrIG9mIG8ua2V5cylcbiAgICAgICAgICAgIGFkZFNxdWFyZShzcXVhcmVzLCBrLCAnZXhwbG9kaW5nJyArIG8uc3RhZ2UpO1xuICAgIHJldHVybiBzcXVhcmVzO1xufVxuZnVuY3Rpb24gYWRkU3F1YXJlKHNxdWFyZXMsIGtleSwga2xhc3MpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gc3F1YXJlcy5nZXQoa2V5KTtcbiAgICBpZiAoY2xhc3NlcylcbiAgICAgICAgc3F1YXJlcy5zZXQoa2V5LCBgJHtjbGFzc2VzfSAke2tsYXNzfWApO1xuICAgIGVsc2VcbiAgICAgICAgc3F1YXJlcy5zZXQoa2V5LCBrbGFzcyk7XG59XG5mdW5jdGlvbiBhcHBlbmRWYWx1ZShtYXAsIGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBhcnIgPSBtYXAuZ2V0KGtleSk7XG4gICAgaWYgKGFycilcbiAgICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgIGVsc2VcbiAgICAgICAgbWFwLnNldChrZXksIFt2YWx1ZV0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyLmpzLm1hcCIsImltcG9ydCB7IGtleTJwb3MsIGNyZWF0ZUVsLCBwb3NUb1RyYW5zbGF0ZSBhcyBwb3NUb1RyYW5zbGF0ZUZyb21Cb3VuZHMsIHRyYW5zbGF0ZUFuZFNjYWxlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHdoaXRlUG92IH0gZnJvbSAnLi9ib2FyZCc7XG5pbXBvcnQgeyBzeW5jU2hhcGVzIH0gZnJvbSAnLi9zeW5jJztcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoc3RhdGUsIGF1dG9QaWVjZUVsKSB7XG4gICAgY29uc3QgYXV0b1BpZWNlcyA9IHN0YXRlLmRyYXdhYmxlLmF1dG9TaGFwZXMuZmlsdGVyKGF1dG9TaGFwZSA9PiBhdXRvU2hhcGUucGllY2UpO1xuICAgIGNvbnN0IGF1dG9QaWVjZVNoYXBlcyA9IGF1dG9QaWVjZXMubWFwKChzKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaGFwZTogcyxcbiAgICAgICAgICAgIGhhc2g6IGhhc2gocyksXG4gICAgICAgICAgICBjdXJyZW50OiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBzeW5jU2hhcGVzKGF1dG9QaWVjZVNoYXBlcywgYXV0b1BpZWNlRWwsIHNoYXBlID0+IHJlbmRlclNoYXBlKHN0YXRlLCBzaGFwZSwgc3RhdGUuZG9tLmJvdW5kcygpKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUmVzaXplZChzdGF0ZSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBhc1doaXRlID0gd2hpdGVQb3Yoc3RhdGUpLCBwb3NUb1RyYW5zbGF0ZSA9IHBvc1RvVHJhbnNsYXRlRnJvbUJvdW5kcyhzdGF0ZS5kb20uYm91bmRzKCkpO1xuICAgIGxldCBlbCA9IChfYSA9IHN0YXRlLmRvbS5lbGVtZW50cy5hdXRvUGllY2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgdHJhbnNsYXRlQW5kU2NhbGUoZWwsIHBvc1RvVHJhbnNsYXRlKGtleTJwb3MoZWwuY2dLZXkpLCBhc1doaXRlKSwgZWwuY2dTY2FsZSk7XG4gICAgICAgIGVsID0gZWwubmV4dFNpYmxpbmc7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyU2hhcGUoc3RhdGUsIHsgc2hhcGUsIGhhc2ggfSwgYm91bmRzKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgY29uc3Qgb3JpZyA9IHNoYXBlLm9yaWc7XG4gICAgY29uc3Qgcm9sZSA9IChfYSA9IHNoYXBlLnBpZWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eucm9sZTtcbiAgICBjb25zdCBjb2xvciA9IChfYiA9IHNoYXBlLnBpZWNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY29sb3I7XG4gICAgY29uc3Qgc2NhbGUgPSAoX2MgPSBzaGFwZS5waWVjZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNjYWxlO1xuICAgIGNvbnN0IHBpZWNlRWwgPSBjcmVhdGVFbCgncGllY2UnLCBgJHtyb2xlfSAke2NvbG9yfWApO1xuICAgIHBpZWNlRWwuc2V0QXR0cmlidXRlKCdjZ0hhc2gnLCBoYXNoKTtcbiAgICBwaWVjZUVsLmNnS2V5ID0gb3JpZztcbiAgICBwaWVjZUVsLmNnU2NhbGUgPSBzY2FsZTtcbiAgICB0cmFuc2xhdGVBbmRTY2FsZShwaWVjZUVsLCBwb3NUb1RyYW5zbGF0ZUZyb21Cb3VuZHMoYm91bmRzKShrZXkycG9zKG9yaWcpLCB3aGl0ZVBvdihzdGF0ZSkpLCBzY2FsZSk7XG4gICAgcmV0dXJuIHBpZWNlRWw7XG59XG5mdW5jdGlvbiBoYXNoKGF1dG9QaWVjZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHJldHVybiBbYXV0b1BpZWNlLm9yaWcsIChfYSA9IGF1dG9QaWVjZS5waWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJvbGUsIChfYiA9IGF1dG9QaWVjZS5waWVjZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNvbG9yLCAoX2MgPSBhdXRvUGllY2UucGllY2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5zY2FsZV0uam9pbignLCcpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXV0b1BpZWNlcy5qcy5tYXAiLCJpbXBvcnQgeyBzdGFydCB9IGZyb20gJy4vYXBpLmpzJztcbmltcG9ydCB7IGNvbmZpZ3VyZSB9IGZyb20gJy4vY29uZmlnLmpzJztcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi9zdGF0ZS5qcyc7XG5pbXBvcnQgeyByZW5kZXJXcmFwIH0gZnJvbSAnLi93cmFwLmpzJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL2V2ZW50cy5qcyc7XG5pbXBvcnQgeyByZW5kZXIsIHJlbmRlclJlc2l6ZWQsIHVwZGF0ZUJvdW5kcyB9IGZyb20gJy4vcmVuZGVyLmpzJztcbmltcG9ydCAqIGFzIGF1dG9QaWVjZXMgZnJvbSAnLi9hdXRvUGllY2VzLmpzJztcbmltcG9ydCAqIGFzIHN2ZyBmcm9tICcuL3N2Zy5qcyc7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XG5leHBvcnQgZnVuY3Rpb24gQ2hlc3Nncm91bmQoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgY29uc3QgbWF5YmVTdGF0ZSA9IGRlZmF1bHRzKCk7XG4gICAgY29uZmlndXJlKG1heWJlU3RhdGUsIGNvbmZpZyB8fCB7fSk7XG4gICAgZnVuY3Rpb24gcmVkcmF3QWxsKCkge1xuICAgICAgICBjb25zdCBwcmV2VW5iaW5kID0gJ2RvbScgaW4gbWF5YmVTdGF0ZSA/IG1heWJlU3RhdGUuZG9tLnVuYmluZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gY29tcHV0ZSBib3VuZHMgZnJvbSBleGlzdGluZyBib2FyZCBlbGVtZW50IGlmIHBvc3NpYmxlXG4gICAgICAgIC8vIHRoaXMgYWxsb3dzIG5vbi1zcXVhcmUgYm9hcmRzIGZyb20gQ1NTIHRvIGJlIGhhbmRsZWQgKGZvciAzRClcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSByZW5kZXJXcmFwKGVsZW1lbnQsIG1heWJlU3RhdGUpLCBib3VuZHMgPSB1dGlsLm1lbW8oKCkgPT4gZWxlbWVudHMuYm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLCByZWRyYXdOb3cgPSAoc2tpcFN2ZykgPT4ge1xuICAgICAgICAgICAgcmVuZGVyKHN0YXRlKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5hdXRvUGllY2VzKVxuICAgICAgICAgICAgICAgIGF1dG9QaWVjZXMucmVuZGVyKHN0YXRlLCBlbGVtZW50cy5hdXRvUGllY2VzKTtcbiAgICAgICAgICAgIGlmICghc2tpcFN2ZyAmJiBlbGVtZW50cy5zdmcpXG4gICAgICAgICAgICAgICAgc3ZnLnJlbmRlclN2ZyhzdGF0ZSwgZWxlbWVudHMuc3ZnLCBlbGVtZW50cy5jdXN0b21TdmcpO1xuICAgICAgICB9LCBvblJlc2l6ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUJvdW5kcyhzdGF0ZSk7XG4gICAgICAgICAgICByZW5kZXJSZXNpemVkKHN0YXRlKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5hdXRvUGllY2VzKVxuICAgICAgICAgICAgICAgIGF1dG9QaWVjZXMucmVuZGVyUmVzaXplZChzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN0YXRlID0gbWF5YmVTdGF0ZTtcbiAgICAgICAgc3RhdGUuZG9tID0ge1xuICAgICAgICAgICAgZWxlbWVudHMsXG4gICAgICAgICAgICBib3VuZHMsXG4gICAgICAgICAgICByZWRyYXc6IGRlYm91bmNlUmVkcmF3KHJlZHJhd05vdyksXG4gICAgICAgICAgICByZWRyYXdOb3csXG4gICAgICAgICAgICB1bmJpbmQ6IHByZXZVbmJpbmQsXG4gICAgICAgIH07XG4gICAgICAgIHN0YXRlLmRyYXdhYmxlLnByZXZTdmdIYXNoID0gJyc7XG4gICAgICAgIHVwZGF0ZUJvdW5kcyhzdGF0ZSk7XG4gICAgICAgIHJlZHJhd05vdyhmYWxzZSk7XG4gICAgICAgIGV2ZW50cy5iaW5kQm9hcmQoc3RhdGUsIG9uUmVzaXplKTtcbiAgICAgICAgaWYgKCFwcmV2VW5iaW5kKVxuICAgICAgICAgICAgc3RhdGUuZG9tLnVuYmluZCA9IGV2ZW50cy5iaW5kRG9jdW1lbnQoc3RhdGUsIG9uUmVzaXplKTtcbiAgICAgICAgc3RhdGUuZXZlbnRzLmluc2VydCAmJiBzdGF0ZS5ldmVudHMuaW5zZXJ0KGVsZW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQocmVkcmF3QWxsKCksIHJlZHJhd0FsbCk7XG59XG5mdW5jdGlvbiBkZWJvdW5jZVJlZHJhdyhyZWRyYXdOb3cpIHtcbiAgICBsZXQgcmVkcmF3aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHJlZHJhd2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmVkcmF3aW5nID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHJlZHJhd05vdygpO1xuICAgICAgICAgICAgcmVkcmF3aW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaGVzc2dyb3VuZC5qcy5tYXAiLCJpbXBvcnQgeyBwYXJzZVlhbWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IHsgQ2hlc3NlclNldHRpbmdzIH0gZnJvbSBcIi4vQ2hlc3NlclNldHRpbmdzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hlc3NlckNvbmZpZyBleHRlbmRzIENoZXNzZXJTZXR0aW5ncyB7XG4gIGlkPzogc3RyaW5nO1xuICBmZW46IHN0cmluZztcbiAgcGduPzogc3RyaW5nO1xuICBzaGFwZXM/OiBhbnk7XG4gIGN1cnJlbnRNb3ZlSWR4PzogbnVtYmVyO1xuICBtb3Zlcz86IHN0cmluZ1tdO1xufVxuXG5jb25zdCBPUklFTlRBVElPTlMgPSBbXCJ3aGl0ZVwiLCBcImJsYWNrXCJdO1xuZXhwb3J0IGNvbnN0IFBJRUNFX1NUWUxFUyA9IFtcbiAgXCJhbHBoYVwiLFxuICBcImNhbGlmb3JuaWFcIixcbiAgXCJjYXJkaW5hbFwiLFxuICBcImNidXJuZXR0XCIsXG4gIFwiY2hlc3M3XCIsXG4gIFwiY2hlc3NudXRcIixcbiAgXCJjb21wYW5pb25cIixcbiAgXCJkdWJyb3ZueVwiLFxuICBcImZhbnRhc3lcIixcbiAgXCJmcmVzY2FcIixcbiAgXCJnaW9jb1wiLFxuICBcImdvdmVybm9yXCIsXG4gIFwiaG9yc2V5XCIsXG4gIFwiaWNwaWVjZXNcIixcbiAgXCJrb3NhbFwiLFxuICBcImxlaXB6aWdcIixcbiAgXCJsZXR0ZXJcIixcbiAgXCJsaWJyYVwiLFxuICBcIm1hZXN0cm9cIixcbiAgXCJtZXJpZGFcIixcbiAgXCJwaXJvdWV0dGlcIixcbiAgXCJwaXhlbFwiLFxuICBcInJlaWxseWNyYWlnXCIsXG4gIFwicmlvaGFjaGFcIixcbiAgXCJzaGFwZXNcIixcbiAgXCJzcGF0aWFsXCIsXG4gIFwic3RhdW50eVwiLFxuICBcInRhdGlhbmFcIixcbl07XG5leHBvcnQgY29uc3QgQk9BUkRfU1RZTEVTID0gW1wiYmx1ZVwiLCBcImJyb3duXCIsIFwiZ3JlZW5cIiwgXCJpY1wiLCBcInB1cnBsZVwiXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3VzZXJfY29uZmlnKFxuICBzZXR0aW5nczogQ2hlc3NlclNldHRpbmdzLFxuICBjb250ZW50OiBzdHJpbmdcbik6IENoZXNzZXJDb25maWcge1xuICBsZXQgdXNlckNvbmZpZzogQ2hlc3NlckNvbmZpZyA9IHtcbiAgICAuLi5zZXR0aW5ncyxcbiAgICBmZW46IFwiXCIsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXNlckNvbmZpZyxcbiAgICAgIC4uLnBhcnNlWWFtbChjb250ZW50KSxcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gZmFpbGVkIHRvIHBhcnNlXG4gICAgcmV0dXJuIHVzZXJDb25maWc7XG4gIH1cbn1cbiIsImNsYXNzIFN0YXJ0aW5nUG9zaXRpb24ge1xuICBlY286IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmZW46IHN0cmluZztcbiAgd2lraVBhdGg6IHN0cmluZztcbiAgbW92ZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGVjbzogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGZlbjogc3RyaW5nLCB3aWtpUGF0aDogc3RyaW5nLCBtb3Zlczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmVjbyA9IGVjbztcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZmVuID0gZmVuO1xuICAgIHRoaXMud2lraVBhdGggPSB3aWtpUGF0aDtcbiAgICB0aGlzLm1vdmVzID0gbW92ZXM7XG4gIH1cbn1cblxuY2xhc3MgQ2F0ZWdvcnkge1xuICBpZDogc3RyaW5nO1xuICBpdGVtczogU3RhcnRpbmdQb3NpdGlvbltdO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGl0ZW1zOiBTdGFydGluZ1Bvc2l0aW9uW10pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICB9XG59XG5cbmNvbnN0IGNhdGVnb3JpZXMgPSBbXG4gIG5ldyBDYXRlZ29yeShcImU0XCIsIFtcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjAwXCIsXG4gICAgICBcIktpbmcncyBQYXduXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHBwcHBwLzgvOC80UDMvOC9QUFBQMVBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDFcIixcbiAgICAgIFwiS2luZydzX1Bhd25fR2FtZVwiLFxuICAgICAgW1wiZTRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDBcIixcbiAgICAgIFwiT3BlbiBHYW1lXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHAxcHBwLzgvNHAzLzRQMy84L1BQUFAxUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJPcGVuX0dhbWVcIixcbiAgICAgIFtcImU0IGU1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjAyXCIsXG4gICAgICBcIkFsZWtoaW5lJ3MgRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Ixci9wcHBwcHBwcC81bjIvOC80UDMvOC9QUFBQMVBQUC9STkJRS0JOUiB3IEtRa3EgLSAxIDJcIixcbiAgICAgIFwiQWxla2hpbmUnc19EZWZlbmNlXCIsXG4gICAgICBbXCJlNCBOZjZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDRcIixcbiAgICAgIFwiQWxla2hpbmUncyBEZWZlbmNlOiBNb2Rlcm4gVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYjFyL3BwcDFwcHBwLzNwNC8zblAzLzNQNC81TjIvUFBQMlBQUC9STkJRS0IxUiBiIEtRa3EgLSAxIDRcIixcbiAgICAgIFwiQWxla2hpbmUnc19EZWZlbmNlI01vZGVybl9WYXJpYXRpb246XzMuZDRfZDZfNC5OZjNcIixcbiAgICAgIFtcImU0IE5mNlwiLCBcImU1IE5kNVwiLCBcImQ0IGQ2XCIsIFwiTmYzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzIzXCIsXG4gICAgICBcIkJpc2hvcCdzIE9wZW5pbmdcIixcbiAgICAgIFwicm5icWtibnIvcHBwcDFwcHAvOC80cDMvMkIxUDMvOC9QUFBQMVBQUC9STkJRSzFOUiBiIEtRa3EgLSAxIDJcIixcbiAgICAgIFwiQmlzaG9wJTI3c19PcGVuaW5nXCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIkJjNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIxMFwiLFxuICAgICAgXCJDYXJvLUthbm4gRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Juci9wcDFwcHBwcC8ycDUvOC80UDMvOC9QUFBQMVBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDJcIixcbiAgICAgIFwiQ2Fyb+KAk0thbm5fRGVmZW5jZVwiLFxuICAgICAgW1wiZTQgYzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMTJcIixcbiAgICAgIFwiQ2Fyby1LYW5uIERlZmVuY2U6IEFkdmFuY2UgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYm5yL3BwMnBwcHAvMnA1LzNwUDMvM1A0LzgvUFBQMlBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDNcIixcbiAgICAgIFwiQ2Fyb+KAk0thbm5fRGVmZW5jZSNBZHZhbmNlX1ZhcmlhdGlvbjpfMy5lNVwiLFxuICAgICAgW1wiZTQgYzZcIiwgXCJkNCBkNVwiLCBcImU1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjE4XCIsXG4gICAgICBcIkNhcm8tS2FubiBEZWZlbmNlOiBDbGFzc2ljYWwgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuMXFrYm5yL3BwMnBwcHAvMnA1LzViMi8zUE4zLzgvUFBQMlBQUC9SMUJRS0JOUiB3IEtRa3EgLSAxIDVcIixcbiAgICAgIFwiQ2Fyb+KAk0thbm5fRGVmZW5jZSNDbGFzc2ljYWxfVmFyaWF0aW9uOl80Li4uQmY1XCIsXG4gICAgICBbXCJlNCBjNlwiLCBcImQ0IGQ1XCIsIFwiTmMzIGR4ZTRcIiwgXCJOeGU0IEJmNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIxM1wiLFxuICAgICAgXCJDYXJvLUthbm4gRGVmZW5jZTogRXhjaGFuZ2UgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYm5yL3BwMnBwcHAvMnA1LzNQNC8zUDQvOC9QUFAyUFBQL1JOQlFLQk5SIGIgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJDYXJvJUUyJTgwJTkzS2Fubl9EZWZlbmNlI0V4Y2hhbmdlX1ZhcmlhdGlvbjpfMy5leGQ1X2N4ZDVcIixcbiAgICAgIFtcImU0IGM2XCIsIFwiZDQgZDVcIiwgXCJleGQ1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjE0XCIsXG4gICAgICBcIkNhcm8tS2FubiBEZWZlbmNlOiBQYW5vdi1Cb3R2aW5uaWsgQXR0YWNrXCIsXG4gICAgICBcInJuYnFrYjFyL3BwMnBwcHAvNW4yLzNwNC8yUFA0LzJONS9QUDNQUFAvUjFCUUtCTlIgYiBLUWtxIC0gMiA1XCIsXG4gICAgICBcIkNhcm/igJNLYW5uX0RlZmVuY2UjUGFub3YuRTIuODAuOTNCb3R2aW5uaWtfQXR0YWNrOl80LmM0XCIsXG4gICAgICBbXCJlNCBjNlwiLCBcImQ0IGQ1XCIsIFwiZXhkNSBjeGQ1XCIsIFwiYzQgTmY2XCIsIFwiTmMzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjE3XCIsXG4gICAgICBcIkNhcm8tS2FubiBEZWZlbmNlOiBTdGVpbml0eiBWYXJpYXRpb25cIixcbiAgICAgIFwicjFicWtibnIvcHAxbnBwcHAvMnA1LzgvM1BOMy84L1BQUDJQUFAvUjFCUUtCTlIgdyBLUWtxIC0gMSA1XCIsXG4gICAgICBcIkNhcm/igJNLYW5uX0RlZmVuY2UjTW9kZXJuX1ZhcmlhdGlvbjpfNC4uLk5kN1wiLFxuICAgICAgW1wiZTQgYzZcIiwgXCJkNCBkNVwiLCBcIk5jMyBkeGU0XCIsIFwiTnhlNCBOZDdcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMjFcIixcbiAgICAgIFwiRGFuaXNoIEdhbWJpdFwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzgvM3BQMy8yUDUvUFAzUFBQL1JOQlFLQk5SIGIgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJEYW5pc2hfR2FtYml0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcImQ0IGV4ZDRcIiwgXCJjM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM0NlwiLFxuICAgICAgXCJGb3VyIEtuaWdodHMgR2FtZVwiLFxuICAgICAgXCJyMWJxa2Ixci9wcHBwMXBwcC8ybjJuMi80cDMvNFAzLzJOMk4yL1BQUFAxUFBQL1IxQlFLQjFSIHcgS1FrcSAtIDQgNFwiLFxuICAgICAgXCJGb3VyX0tuaWdodHNfR2FtZVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmM2XCIsIFwiTmMzIE5mNlwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM0N1wiLFxuICAgICAgXCJGb3VyIEtuaWdodHMgR2FtZTogU2NvdGNoIFZhcmlhdGlvblwiLFxuICAgICAgXCJyMWJxa2Ixci9wcHBwMXBwcC8ybjJuMi80cDMvM1BQMy8yTjJOMi9QUFAyUFBQL1IxQlFLQjFSIGIgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJGb3VyX0tuaWdodHNfR2FtZSM0LmQ0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJOYzMgTmY2XCIsIFwiZDRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNDhcIixcbiAgICAgIFwiRm91ciBLbmlnaHRzIEdhbWU6IFNwYW5pc2ggVmFyaWF0aW9uXCIsXG4gICAgICBcInIxYnFrYjFyL3BwcHAxcHBwLzJuMm4yLzFCMnAzLzRQMy8yTjJOMi9QUFBQMVBQUC9SMUJRSzJSIGIgS1FrcSAtIDUgNFwiLFxuICAgICAgXCJGb3VyX0tuaWdodHNfR2FtZSM0LkJiNVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmY2XCIsIFwiTmMzIE5jNlwiLCBcIkJiNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkMwMFwiLFxuICAgICAgXCJGcmVuY2ggRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC80cDMvOC80UDMvOC9QUFBQMVBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDJcIixcbiAgICAgIFwiRnJlbmNoX0RlZmVuY2VcIixcbiAgICAgIFtcImU0IGU2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzAyXCIsXG4gICAgICBcIkZyZW5jaCBEZWZlbmNlOiBBZHZhbmNlIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci9wcHAycHBwLzRwMy8zcFAzLzNQNC84L1BQUDJQUFAvUk5CUUtCTlIgYiBLUWtxIC0gMCAzXCIsXG4gICAgICBcIkZyZW5jaF9EZWZlbmNlI0FkdmFuY2VfVmFyaWF0aW9uOl8zLmU1XCIsXG4gICAgICBbXCJlNCBlNlwiLCBcImQ0IGQ1XCIsIFwiZTVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMTFcIixcbiAgICAgIFwiRnJlbmNoIERlZmVuY2U6IEJ1cm4gVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYjFyL3BwcDJwcHAvNHBuMi8zcDJCMS8zUFAzLzJONS9QUFAyUFBQL1IyUUtCTlIgYiBLUWtxIC0gMCA1XCIsXG4gICAgICBcIkZyZW5jaF9EZWZlbmNlIzMuTmMzXCIsXG4gICAgICBbXCJlNCBlNlwiLCBcImQ0IGQ1XCIsIFwiTmMzIE5mNlwiLCBcIkJnNSBkeGU0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzExXCIsXG4gICAgICBcIkZyZW5jaCBEZWZlbmNlOiBDbGFzc2ljYWwgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYjFyL3BwcDJwcHAvNHBuMi8zcDQvM1BQMy8yTjUvUFBQMlBQUC9SMUJRS0JOUiB3IEtRa3EgLSAyIDRcIixcbiAgICAgIFwiRnJlbmNoX0RlZmVuY2UjQ2xhc3NpY2FsX1ZhcmlhdGlvbjpfMy4uLk5mNlwiLFxuICAgICAgW1wiZTQgZTZcIiwgXCJkNCBkNVwiLCBcIk5jMyBOZjZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMDFcIixcbiAgICAgIFwiRnJlbmNoIERlZmVuY2U6IEV4Y2hhbmdlIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci9wcHAycHBwLzRwMy8zUDQvM1A0LzgvUFBQMlBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDNcIixcbiAgICAgIFwiRnJlbmNoX0RlZmVuY2UjRXhjaGFuZ2VfVmFyaWF0aW9uOl8zLmV4ZDVfZXhkNVwiLFxuICAgICAgW1wiZTQgZTZcIiwgXCJkNCBkNVwiLCBcImV4ZDVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMTBcIixcbiAgICAgIFwiRnJlbmNoIERlZmVuY2U6IFJ1Ymluc3RlaW4gVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcDJwcHAvNHAzLzgvM1BwMy8yTjUvUFBQMlBQUC9SMUJRS0JOUiB3IEtRa3EgLSAwIDRcIixcbiAgICAgIFwiRnJlbmNoX0RlZmVuY2UjUnViaW5zdGVpbl9WYXJpYXRpb246XzMuLi5keGU0XCIsXG4gICAgICBbXCJlNCBlNlwiLCBcImQ0IGQ1XCIsIFwiTmMzIGR4ZTRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMDNcIixcbiAgICAgIFwiRnJlbmNoIERlZmVuY2U6IFRhcnJhc2NoIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci9wcHAycHBwLzRwMy8zcDQvM1BQMy84L1BQUE4xUFBQL1IxQlFLQk5SIGIgS1FrcSAtIDEgM1wiLFxuICAgICAgXCJGcmVuY2hfRGVmZW5jZSNUYXJyYXNjaF9WYXJpYXRpb246XzMuTmQyXCIsXG4gICAgICBbXCJlNCBlNlwiLCBcImQ0IGQ1XCIsIFwiTmQyXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzE1XCIsXG4gICAgICBcIkZyZW5jaCBEZWZlbmNlOiBXaW5hd2VyIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxazFuci9wcHAycHBwLzRwMy8zcDQvMWIxUFAzLzJONS9QUFAyUFBQL1IxQlFLQk5SIHcgS1FrcSAtIDIgNFwiLFxuICAgICAgXCJGcmVuY2hfRGVmZW5jZSNXaW5hd2VyX1ZhcmlhdGlvbjpfMy4uLkJiNFwiLFxuICAgICAgW1wiZTQgZTZcIiwgXCJkNCBkNVwiLCBcIk5jMyBCYjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNTBcIixcbiAgICAgIFwiR2l1b2NvIFBpYW5vXCIsXG4gICAgICBcInIxYnFrMW5yL3BwcHAxcHBwLzJuNS8yYjFwMy8yQjFQMy81TjIvUFBQUDFQUFAvUk5CUUsyUiB3IEtRa3EgLSA0IDRcIixcbiAgICAgIFwiR2l1b2NvX1BpYW5vXCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJCYzQgQmM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzUwXCIsXG4gICAgICBcIkl0YWxpYW4gR2FtZVwiLFxuICAgICAgXCJyMWJxa2Juci9wcHBwMXBwcC8ybjUvNHAzLzJCMVAzLzVOMi9QUFBQMVBQUC9STkJRSzJSIGIgS1FrcSAtIDMgM1wiLFxuICAgICAgXCJJdGFsaWFuX0dhbWVcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcIkJjNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM1MVwiLFxuICAgICAgXCJFdmFucyBHYW1iaXRcIixcbiAgICAgIFwicjFicWsxbnIvcHBwcDFwcHAvMm41LzJiMXAzLzFQQjFQMy81TjIvUDFQUDFQUFAvUk5CUUsyUiBiIEtRa3EgLSAwIDRcIixcbiAgICAgIFwiRXZhbnNfR2FtYml0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJCYzQgQmM1XCIsIFwiYjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNTBcIixcbiAgICAgIFwiSXRhbGlhbiBHYW1lOiBIdW5nYXJpYW4gRGVmZW5jZVwiLFxuICAgICAgXCJyMWJxazFuci9wcHBwYnBwcC8ybjUvNHAzLzJCMVAzLzVOMi9QUFBQMVBQUC9STkJRSzJSIHcgS1FrcSAtIDQgNFwiLFxuICAgICAgXCJIdW5nYXJpYW5fRGVmZW5zZVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmM2XCIsIFwiQmM0IEJlN1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM1NVwiLFxuICAgICAgXCJJdGFsaWFuIEdhbWU6IFR3byBLbmlnaHRzIERlZmVuY2VcIixcbiAgICAgIFwicjFicWtiMXIvcHBwcDFwcHAvMm4ybjIvNHAzLzJCMVAzLzVOMi9QUFBQMVBQUC9STkJRSzJSIHcgS1FrcSAtIDQgNFwiLFxuICAgICAgXCJUd29fS25pZ2h0c19EZWZlbnNlXCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJCYzQgTmY2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzMwXCIsXG4gICAgICBcIktpbmcncyBHYW1iaXRcIixcbiAgICAgIFwicm5icWtibnIvcHBwcDFwcHAvOC80cDMvNFBQMi84L1BQUFAyUFAvUk5CUUtCTlIgYiBLUWtxIC0gMCAyXCIsXG4gICAgICBcIktpbmcnc19HYW1iaXRcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiZjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMzNcIixcbiAgICAgIFwiS2luZydzIEdhbWJpdCBBY2NlcHRlZFwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzgvNFBwMi84L1BQUFAyUFAvUk5CUUtCTlIgdyBLUWtxIC0gMCAzXCIsXG4gICAgICBcIktpbmcnc19HYW1iaXQjS2luZy4yN3NfR2FtYml0X0FjY2VwdGVkOl8yLi4uZXhmNFwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJmNCBleGY0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzMzXCIsXG4gICAgICBcIktpbmcncyBHYW1iaXQgQWNjZXB0ZWQ6IEJpc2hvcCdzIEdhbWJpdFwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzgvMkIxUHAyLzgvUFBQUDJQUC9STkJRSzFOUiBiIEtRa3EgLSAxIDNcIixcbiAgICAgIFwiS2luZydzX0dhbWJpdCNLaW5nLjI3c19HYW1iaXRfQWNjZXB0ZWQ6XzIuLi5leGY0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcImY0IGV4ZjRcIiwgXCJCYzRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMzZcIixcbiAgICAgIFwiS2luZydzIEdhbWJpdCBBY2NlcHRlZDogTW9kZXJuIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtibnIvcHBwMnBwcC84LzNwNC80UHAyLzVOMi9QUFBQMlBQL1JOQlFLQjFSIHcgS1FrcSBkNiAwIDRcIixcbiAgICAgIFwiS2luZydzX0dhbWJpdCNNb2Rlcm5fRGVmZW5jZTpfMy4uLmQ1XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcImY0IGV4ZjRcIiwgXCJOZjMgZDVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMzBcIixcbiAgICAgIFwiS2luZydzIEdhbWJpdCBBY2NlcHRlZDogQ2xhc3NpY2FsIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXAxcC84LzZwMS80UHAyLzVOMi9QUFBQMlBQL1JOQlFLQjFSIHcgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJLaW5nJ3NfR2FtYml0I0NsYXNzaWNhbF9WYXJpYXRpb246XzMuLi5nNVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJmNCBleGY0XCIsIFwiTmYzIGc1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzMwXCIsXG4gICAgICBcIktpbmcncyBHYW1iaXQgRGVjbGluZWQ6IENsYXNzaWNhbCBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsxbnIvcHBwcDFwcHAvOC8yYjFwMy80UFAyLzgvUFBQUDJQUC9STkJRS0JOUiB3IEtRa3EgLSAxIDNcIixcbiAgICAgIFwiS2luZydzX0dhbWJpdCNDbGFzc2ljYWxfRGVmZW5jZTpfMi4uLkJjNVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJmNCBCYzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMzFcIixcbiAgICAgIFwiS2luZydzIEdhbWJpdDogRmFsa2JlZXIgQ291bnRlcmdhbWJpdFwiLFxuICAgICAgXCJybmJxa2Juci9wcHAycHBwLzgvM3BwMy80UFAyLzgvUFBQUDJQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDNcIixcbiAgICAgIFwiS2luZyUyN3NfR2FtYml0LF9GYWxrYmVlcl9Db3VudGVyZ2FtYml0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcImY0IGQ1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjA2XCIsXG4gICAgICBcIk1vZGVybiBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHBwcDFwLzZwMS84LzRQMy84L1BQUFAxUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJNb2Rlcm5fRGVmZW5zZVwiLFxuICAgICAgW1wiZTQgZzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDZcIixcbiAgICAgIFwiTW9kZXJuIERlZmVuY2U6IFJvYmF0c2NoIERlZmVuY2VcIixcbiAgICAgIFwicm5icWsxbnIvcHBwcHBwYnAvNnAxLzgvM1BQMy8yTjUvUFBQMlBQUC9SMUJRS0JOUiBiIEtRa3EgLSAyIDNcIixcbiAgICAgIFwiTW9kZXJuX0RlZmVuc2VcIixcbiAgICAgIFtcImU0IGc2XCIsIFwiZDQgQmc3XCIsIFwiTmMzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQxXCIsXG4gICAgICBcIlBoaWxpZG9yIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtibnIvcHBwMnBwcC8zcDQvNHAzLzRQMy81TjIvUFBQUDFQUFAvUk5CUUtCMVIgdyBLUWtxIC0gMCAzXCIsXG4gICAgICBcIlBoaWxpZG9yX0RlZmVuY2VcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIGQ2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQxXCIsXG4gICAgICBcIlBoaWxpZG9yIERlZmVuY2U6IExpb24gVmFyaWF0aW9uXCIsXG4gICAgICBcInIxYnFrYjFyL3BwcG4xcHBwLzNwMW4yLzRwMy8zUFAzLzJOMk4yL1BQUDJQUFAvUjFCUUtCMVIgdyBLUWtxIC0gMiA1XCIsXG4gICAgICBcIlBoaWxpZG9yX0RlZmVuY2VcIixcbiAgICAgIFtcImU0IGQ2XCIsIFwiZDQgTmY2XCIsIFwiTmMzIGU1XCIsIFwiTmYzIE5iZDdcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDdcIixcbiAgICAgIFwiTGlvbiBWYXJpYXRpb246IEFudGktUGhpbGlkb3JcIixcbiAgICAgIFwicjFicWtiMXIvcHBwbjFwcHAvM3AxbjIvNHAzLzNQUFAyLzJONS9QUFAzUFAvUjFCUUtCTlIgdyBLUWtxIC0gMCA1XCIsXG4gICAgICBcIlBoaWxpZG9yX0RlZmVuY2VcIixcbiAgICAgIFtcImU0IGQ2XCIsIFwiZDQgTmY2XCIsIFwiTmMzIE5iZDdcIiwgXCJmNCBlNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIwN1wiLFxuICAgICAgXCJQaXJjIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwcHAvM3AxbjIvOC8zUFAzLzgvUFBQMlBQUC9STkJRS0JOUiB3IEtRa3EgLSAyIDNcIixcbiAgICAgIFwiUGlyY19EZWZlbmNlXCIsXG4gICAgICBbXCJlNCBkNlwiLCBcImQ0IE5mNlwiLCBcIk5jM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIwOVwiLFxuICAgICAgXCJQaXJjIERlZmVuY2U6IEF1c3RyaWFuIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHAxcC8zcDFucDEvOC8zUFBQMi8yTjUvUFBQM1BQL1IxQlFLQk5SIGIgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJQaXJjX0RlZmVuY2UjQXVzdHJpYW5fQXR0YWNrOl80LmY0XCIsXG4gICAgICBbXCJlNCBkNlwiLCBcImQ0IE5mNlwiLCBcIk5jMyBnNlwiLCBcImY0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjA3XCIsXG4gICAgICBcIlBpcmMgRGVmZW5jZTogQ2xhc3NpY2FsIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHAxcC8zcDFucDEvOC8zUFAzLzJOMk4yL1BQUDJQUFAvUjFCUUtCMVIgYiBLUWtxIC0gMSA0XCIsXG4gICAgICBcIlBpcmNfRGVmZW5jZSNDbGFzc2ljYWxfLjI4VHdvX0tuaWdodHMuMjlfU3lzdGVtOl80Lk5mM1wiLFxuICAgICAgW1wiZTQgZDZcIiwgXCJkNCBOZjZcIiwgXCJOYzMgZzZcIiwgXCJOZjNcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDdcIixcbiAgICAgIFwiUGlyYyBEZWZlbmNlOiBMaW9uIFZhcmlhdGlvblwiLFxuICAgICAgXCJyMWJxa2Ixci9wcHBucHBwcC8zcDFuMi84LzNQUDMvMk41L1BQUDJQUFAvUjFCUUtCTlIgdyBLUWtxIC0gMyA0XCIsXG4gICAgICBcIlBpcmNfRGVmZW5jZSNDbGFzc2ljYWxfLjI4VHdvX0tuaWdodHMuMjlfU3lzdGVtXCIsXG4gICAgICBbXCJlNCBkNlwiLCBcImQ0IE5mNlwiLCBcIk5jMyBOYmQ3XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQyXCIsXG4gICAgICBcIlBldHJvdidzIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtiMXIvcHBwcDFwcHAvNW4yLzRwMy80UDMvNU4yL1BQUFAxUFBQL1JOQlFLQjFSIHcgS1FrcSAtIDIgM1wiLFxuICAgICAgXCJQZXRyb3Ync19EZWZlbmNlXCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOZjZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNDJcIixcbiAgICAgIFwiUGV0cm92J3MgRGVmZW5jZTogQ2xhc3NpY2FsIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Ixci9wcHAycHBwLzNwNC84LzNQbjMvNU4yL1BQUDJQUFAvUk5CUUtCMVIgYiBLUWtxIC0gMCA1XCIsXG4gICAgICBcIlBldHJvdidzX0RlZmVuY2UjMy5OeGU1XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOZjZcIiwgXCJOeGU1IGQ2XCIsIFwiTmYzIE54ZTRcIiwgXCJkNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM0M1wiLFxuICAgICAgXCJQZXRyb3YncyBEZWZlbmNlOiBTdGVpbml0eiBBdHRhY2tcIixcbiAgICAgIFwicm5icWtiMXIvcHBwcDFwcHAvNW4yLzRwMy8zUFAzLzVOMi9QUFAyUFBQL1JOQlFLQjFSIGIgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJQZXRyb3Ync19EZWZlbmNlIzMuZDRcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5mNlwiLCBcImQ0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQyXCIsXG4gICAgICBcIlBldHJvdidzIERlZmVuY2U6IFRocmVlIEtuaWdodHMgR2FtZVwiLFxuICAgICAgXCJybmJxa2Ixci9wcHBwMXBwcC81bjIvNHAzLzRQMy8yTjJOMi9QUFBQMVBQUC9SMUJRS0IxUiBiIEtRa3EgLSAzIDNcIixcbiAgICAgIFwiUGV0cm92J3NfRGVmZW5jZSMzLk5jM1wiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmY2XCIsIFwiTmMzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzYwXCIsXG4gICAgICBcIlJ1eSBMb3BlelwiLFxuICAgICAgXCJyMWJxa2Juci9wcHBwMXBwcC8ybjUvMUIycDMvNFAzLzVOMi9QUFBQMVBQUC9STkJRSzJSIGIgS1FrcSAtIDMgM1wiLFxuICAgICAgXCJSdXlfTG9wZXpcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcIkJiNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkM2NVwiLFxuICAgICAgXCJSdXkgTG9wZXo6IEJlcmxpbiBEZWZlbmNlXCIsXG4gICAgICBcInIxYnFrYjFyL3BwcHAxcHBwLzJuMm4yLzFCMnAzLzRQMy81TjIvUFBQUDFQUFAvUk5CUUsyUiB3IEtRa3EgLSA0IDRcIixcbiAgICAgIFwiUnV5X0xvcGV6I0Jlcmxpbl9EZWZlbmNlOl8zLi4uTmY2XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJCYjUgTmY2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzY0XCIsXG4gICAgICBcIlJ1eSBMb3BlejogQ2xhc3NpY2FsIFZhcmlhdGlvblwiLFxuICAgICAgXCJyMWJxazFuci9wcHBwMXBwcC8ybjUvMUJiMXAzLzRQMy81TjIvUFBQUDFQUFAvUk5CUUsyUiB3IEtRa3EgLSA0IDRcIixcbiAgICAgIFwiUnV5X0xvcGV6I0NsYXNzaWNhbF9EZWZlbmNlOl8zLi4uQmM1XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJCYjUgQmM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzg0XCIsXG4gICAgICBcIlJ1eSBMb3BlejogQ2xvc2VkIFZhcmlhdGlvblwiLFxuICAgICAgXCJyMWJxazJyLzJwcGJwcHAvcDFuMm4yLzFwMnAzLzRQMy8xQjNOMi9QUFBQMVBQUC9STkJRUjFLMSBiIGtxIC0gMSA3XCIsXG4gICAgICBcIlJ1eV9Mb3BleiNNYWluX2xpbmU6XzQuQmE0X05mNl81LjAtMF9CZTdfNi5SZTFfYjVfNy5CYjNfZDZfOC5jM18wLTBcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcIkJiNSBhNlwiLCBcIkJhNCBOZjZcIiwgXCJPLU8gQmU3XCIsIFwiUmUxIGI1XCIsIFwiQmIzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzY4XCIsXG4gICAgICBcIlJ1eSBMb3BlejogRXhjaGFuZ2UgVmFyaWF0aW9uXCIsXG4gICAgICBcInIxYnFrYm5yLzFwcHAxcHBwL3AxQjUvNHAzLzRQMy81TjIvUFBQUDFQUFAvUk5CUUsyUiBiIEtRa3EgLSAwIDRcIixcbiAgICAgIFwiUnV5X0xvcGV6LF9FeGNoYW5nZV9WYXJpYXRpb25cIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcIkJiNSBhNlwiLCBcIkJ4YzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDODlcIixcbiAgICAgIFwiUnV5IExvcGV6OiBNYXJzaGFsbCBBdHRhY2tcIixcbiAgICAgIFwicjFicTFyazEvMnAxYnBwcC9wMW4ybjIvMXAxcHAzLzRQMy8xQlAyTjIvUFAxUDFQUFAvUk5CUVIxSzEgdyAtIC0gMCA5XCIsXG4gICAgICBcIlJ1eV9Mb3BleiNNYXJzaGFsbF9BdHRhY2tcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcIkJiNSBhNlwiLCBcIkJhNCBOZjZcIiwgXCJPLU8gQmU3XCIsIFwiUmUxIGI1XCIsIFwiQmIzIE8tT1wiLCBcImMzIGQ1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzYzXCIsXG4gICAgICBcIlJ1eSBMb3BlejogU2NobGllbWFubiBEZWZlbmNlXCIsXG4gICAgICBcInIxYnFrYm5yL3BwcHAycHAvMm41LzFCMnBwMi80UDMvNU4yL1BQUFAxUFBQL1JOQlFLMlIgdyBLUWtxIC0gMCA0XCIsXG4gICAgICBcIlJ1eV9Mb3BleiNTY2hsaWVtYW5uX0RlZmVuY2U6XzMuLi5mNVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmM2XCIsIFwiQmI1IGY1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjAxXCIsXG4gICAgICBcIlNjYW5kaW5hdmlhbiBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcDFwcHBwLzgvM3A0LzRQMy84L1BQUFAxUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJTY2FuZGluYXZpYW5fRGVmZW5zZVwiLFxuICAgICAgW1wiZTQgZDVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDFcIixcbiAgICAgIFwiU2NhbmRpbmF2aWFuIERlZmVuY2U6IE1vZGVybiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwcHAvNW4yLzNQNC8zUDQvOC9QUFAyUFBQL1JOQlFLQk5SIGIgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJTY2FuZGluYXZpYW5fRGVmZW5zZSMyLi4uTmY2XCIsXG4gICAgICBbXCJlNCBkNVwiLCBcImV4ZDUgTmY2XCIsIFwiZDRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMDFcIixcbiAgICAgIFwiU2NhbmRpbmF2aWFuIERlZmVuY2U6IEljZWxhbmRpYy1QYWxtZSBHYW1iaXRcIixcbiAgICAgIFwicm5icWtiMXIvcHBwMnBwcC80cG4yLzNQNC8yUDUvOC9QUDFQMVBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDRcIixcbiAgICAgIFwiU2NhbmRpbmF2aWFuX0RlZmVuc2UjMi4uLk5mNlwiLFxuICAgICAgW1wiZTQgZDVcIiwgXCJleGQ1IE5mNlwiLCBcImM0IGU2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQ0XCIsXG4gICAgICBcIlNjb3RjaCBHYW1lXCIsXG4gICAgICBcInIxYnFrYm5yL3BwcHAxcHBwLzJuNS80cDMvM1BQMy81TjIvUFBQMlBQUC9STkJRS0IxUiBiIEtRa3EgLSAwIDNcIixcbiAgICAgIFwiU2NvdGNoX0dhbWVcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmYzIE5jNlwiLCBcImQ0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQ1XCIsXG4gICAgICBcIlNjb3RjaCBHYW1lOiBDbGFzc2ljYWwgVmFyaWF0aW9uXCIsXG4gICAgICBcInIxYnFrMW5yL3BwcHAxcHBwLzJuNS8yYjUvM05QMy84L1BQUDJQUFAvUk5CUUtCMVIgdyBLUWtxIC0gMSA1XCIsXG4gICAgICBcIlNjb3RjaF9HYW1lLF9DbGFzc2ljYWxfVmFyaWF0aW9uXCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJkNCBleGQ0XCIsIFwiTnhkNCBCYzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNDVcIixcbiAgICAgIFwiU2NvdGNoIEdhbWU6IE1pZXNlcyBWYXJpYXRpb25cIixcbiAgICAgIFwicjFicWtiMXIvcDFwcDFwcHAvMnAybjIvNFAzLzgvOC9QUFAyUFBQL1JOQlFLQjFSIGIgS1FrcSAtIDAgNlwiLFxuICAgICAgXCJTY290Y2hfR2FtZSNTY2htaWR0X1ZhcmlhdGlvbjpfNC4uLk5mNlwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmM2XCIsIFwiZDQgZXhkNFwiLCBcIk54ZDQgTmY2XCIsIFwiTnhjNiBieGM2XCIsIFwiZTVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDNDVcIixcbiAgICAgIFwiU2NvdGNoIEdhbWU6IFN0ZWluaXR6IFZhcmlhdGlvblwiLFxuICAgICAgXCJyMWIxa2Juci9wcHBwMXBwcC8ybjUvOC8zTlAycS84L1BQUDJQUFAvUk5CUUtCMVIgdyBLUWtxIC0gMSA1XCIsXG4gICAgICBcIlNjb3RjaF9HYW1lI1N0ZWluaXR6X1ZhcmlhdGlvbjpfNC4uLlFoNC4yMS4zRlwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJOZjMgTmM2XCIsIFwiZDQgZXhkNFwiLCBcIk54ZDQgUWg0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjIwXCIsXG4gICAgICBcIlNpY2lsaWFuIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtibnIvcHAxcHBwcHAvOC8ycDUvNFAzLzgvUFBQUDFQUFAvUk5CUUtCTlIgdyBLUWtxIC0gMCAyXCIsXG4gICAgICBcIlNpY2lsaWFuX0RlZmVuY2VcIixcbiAgICAgIFtcImU0IGM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjM2XCIsXG4gICAgICBcIlNpY2lsaWFuIERlZmVuY2U6IEFjY2VsZXJhdGVkIERyYWdvblwiLFxuICAgICAgXCJyMWJxa2Juci9wcDFwcHAxcC8ybjNwMS84LzNOUDMvOC9QUFAyUFBQL1JOQlFLQjFSIHcgS1FrcSAtIDAgNVwiLFxuICAgICAgXCJTaWNpbGlhbl9EZWZlbmNlLF9BY2NlbGVyYXRlZF9EcmFnb25cIixcbiAgICAgIFtcImU0IGM1XCIsIFwiTmYzIE5jNlwiLCBcImQ0IGN4ZDRcIiwgXCJOeGQ0IGc2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjIyXCIsXG4gICAgICBcIlNpY2lsaWFuIERlZmVuY2U6IEFsYXBpbiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtibnIvcHAxcHBwcHAvOC8ycDUvNFAzLzJQNS9QUDFQMVBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDJcIixcbiAgICAgIFwiU2ljaWxpYW5fRGVmZW5jZSxfQWxhcGluX1ZhcmlhdGlvblwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJjM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIyM1wiLFxuICAgICAgXCJTaWNpbGlhbiBEZWZlbmNlOiBDbG9zZWQgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYm5yL3BwMXBwcHBwLzgvMnA1LzRQMy8yTjUvUFBQUDFQUFAvUjFCUUtCTlIgYiBLUWtxIC0gMSAyXCIsXG4gICAgICBcIlNpY2lsaWFuX0RlZmVuY2UjQ2xvc2VkX1NpY2lsaWFuXCIsXG4gICAgICBbXCJlNCBjNVwiLCBcIk5jM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkI3MFwiLFxuICAgICAgXCJTaWNpbGlhbiBEZWZlbmNlOiBEcmFnb24gVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYjFyL3BwMnBwMXAvM3AxbnAxLzgvM05QMy8yTjUvUFBQMlBQUC9SMUJRS0IxUiB3IEtRa3EgLSAwIDZcIixcbiAgICAgIFwiU2ljaWxpYW5fRGVmZW5jZSxfRHJhZ29uX1ZhcmlhdGlvblwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJOZjMgZDZcIiwgXCJkNCBjeGQ0XCIsIFwiTnhkNCBOZjZcIiwgXCJOYzMgZzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMjNcIixcbiAgICAgIFwiU2ljaWxpYW4gRGVmZW5jZTogR3JhbmQgUHJpeCBBdHRhY2tcIixcbiAgICAgIFwibmJxa2Juci9wcDFwcHBwcC84LzJwNS80UFAyLzgvUFBQUDJQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDJcIixcbiAgICAgIFwiU2ljaWxpYW5fRGVmZW5jZSNHcmFuZF9Qcml4X0F0dGFja1wiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJmNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkIyN1wiLFxuICAgICAgXCJTaWNpbGlhbiBEZWZlbmNlOiBIeXBlci1BY2NlbGVyYXRlZCBEcmFnb25cIixcbiAgICAgIFwicm5icWtibnIvcHAxcHBwMXAvNnAxLzJwNS80UDMvNU4yL1BQUFAxUFBQL1JOQlFLQjFSIHcgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJTaWNpbGlhbl9EZWZlbmNlIzIuLi5nNjpfSHVuZ2FyaWFuX1ZhcmlhdGlvblwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJOZjMgZzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCNDFcIixcbiAgICAgIFwiU2ljaWxpYW4gRGVmZW5jZTogS2FuIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci8xcDFwMXBwcC9wM3AzLzgvM05QMy84L1BQUDJQUFAvUk5CUUtCMVIgdyBLUWtxIC0gMCA1XCIsXG4gICAgICBcIlNpY2lsaWFuX0RlZmVuY2UjS2FuXy4yOFBhdWxzZW4uMjlfVmFyaWF0aW9uOl80Li4uYTZcIixcbiAgICAgIFtcImU0IGM1XCIsIFwiTmYzIGU2XCIsIFwiZDQgY3hkNFwiLCBcIk54ZDQgYTZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCOTBcIixcbiAgICAgIFwiU2ljaWxpYW4gRGVmZW5jZTogTmFqZG9yZiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtiMXIvMXAycHBwcC9wMnAxbjIvOC8zTlAzLzJONS9QUFAyUFBQL1IxQlFLQjFSIHcgS1FrcSAtIDAgNlwiLFxuICAgICAgXCJTaWNpbGlhbl9EZWZlbmNlLF9OYWpkb3JmX1ZhcmlhdGlvblwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJOZjMgZDZcIiwgXCJkNCBjeGQ0XCIsIFwiTnhkNCBOZjZcIiwgXCJOYzMgYTZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCNjBcIixcbiAgICAgIFwiU2ljaWxpYW4gRGVmZW5jZTogUmljaHRlci1SYXV6ZXIgVmFyaWF0aW9uXCIsXG4gICAgICBcInIxYnFrYjFyL3BwMnBwcHAvMm5wMW4yLzZCMS8zTlAzLzJONS9QUFAyUFBQL1IyUUtCMVIgYiBLUWtxIC0gNCA2XCIsXG4gICAgICBcIlNpY2lsaWFuX0RlZmVuY2UjQ2xhc3NpY2FsX1ZhcmlhdGlvbjpfNS4uLk5jNlwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJOZjMgZDZcIiwgXCJkNCBjeGQ0XCIsIFwiTnhkNCBOZjZcIiwgXCJOYzMgTmM2XCIsIFwiQmc1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQjgwXCIsXG4gICAgICBcIlNpY2lsaWFuIERlZmVuY2U6IFNjaGV2ZW5pbmdlbiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtiMXIvcHAzcHBwLzNwcG4yLzgvM05QMy8yTjUvUFBQMlBQUC9SMUJRS0IxUiB3IEtRa3EgLSAwIDZcIixcbiAgICAgIFwiU2ljaWxpYW5fRGVmZW5jZSxfU2NoZXZlbmluZ2VuX1ZhcmlhdGlvblwiLFxuICAgICAgW1wiZTQgYzVcIiwgXCJOZjMgZDZcIiwgXCJkNCBjeGQ0XCIsIFwiTnhkNCBOZjZcIiwgXCJOYzMgZTZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJCMjFcIixcbiAgICAgIFwiU2ljaWxpYW4gRGVmZW5jZTogU21pdGgtTW9ycmEgR2FtYml0XCIsXG4gICAgICBcInJuYnFrYm5yL3BwMXBwcHBwLzgvOC8zcFAzLzJQNS9QUDNQUFAvUk5CUUtCTlIgYiBLUWtxIC0gMCAzXCIsXG4gICAgICBcIlNpY2lsaWFuX0RlZmVuY2UsX1NtaXRo4oCTTW9ycmFfR2FtYml0XCIsXG4gICAgICBbXCJlNCBjNVwiLCBcImQ0IGN4ZDRcIiwgXCJjM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkMyNVwiLFxuICAgICAgXCJWaWVubmEgR2FtZVwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzRwMy80UDMvMk41L1BQUFAxUFBQL1IxQlFLQk5SIGIgS1FrcSAtIDEgMlwiLFxuICAgICAgXCJWaWVubmFfR2FtZVwiLFxuICAgICAgW1wiZTQgZTVcIiwgXCIgTmMzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzI3XCIsXG4gICAgICBcIlZpZW5uYSBHYW1lOiBGcmFua2Vuc3RlaW4tRHJhY3VsYSBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtiMXIvcHBwcDFwcHAvOC80cDMvMkIxbjMvMk41L1BQUFAxUFBQL1IxQlFLMU5SIHcgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJGcmFua2Vuc3RlaW4tRHJhY3VsYV9WYXJpYXRpb25cIixcbiAgICAgIFtcImU0IGU1XCIsIFwiTmMzIE5mNlwiLCBcIkJjNCBOeGU0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQzQ2XCIsXG4gICAgICBcIkZvdXIgS25pZ2h0cyBHYW1lOiBIYWxsb3dlZW4gR2FtYml0XCIsXG4gICAgICBcInIxYnFrYjFyL3BwcHAxcHBwLzJuMm4yLzROMy80UDMvMk41L1BQUFAxUFBQL1IxQlFLQjFSIGIgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJIYWxsb3dlZW5fR2FtYml0XCIsXG4gICAgICBbXCJlNCBlNVwiLCBcIk5mMyBOYzZcIiwgXCJOYzMgTmY2XCIsIFwiTnhlNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkMyMFwiLFxuICAgICAgXCJLaW5nJ3MgUGF3biBHYW1lOiBXYXl3YXJkIFF1ZWVuIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzRwMlEvNFAzLzgvUFBQUDFQUFAvUk5CMUtCTlIgYiBLUWtxIC0gMSAyXCIsXG4gICAgICBcIkRhbnZlcnNfT3BlbmluZ1wiLFxuICAgICAgW1wiZTQgZTVcIiwgXCJRaDVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJDMjBcIixcbiAgICAgIFwiQm9uZ2Nsb3VkIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Juci9wcHBwMXBwcC84LzRwMy80UDMvOC9QUFBQS1BQUC9STkJRMUJOUiBiIGtxIC0gMSAyXCIsXG4gICAgICBcIkJvbmdcIixcbiAgICAgIFtcImU0IGU1XCIsIFwiS2UyXCJdXG4gICAgKSxcbiAgXSksXG4gIG5ldyBDYXRlZ29yeShcImQ0XCIsIFtcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTQwXCIsXG4gICAgICBcIlF1ZWVuJ3MgUGF3blwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwcHBwcC84LzgvM1A0LzgvUFBQMVBQUFAvUk5CUUtCTlIgYiBLUWtxIC0gMCAxXCIsXG4gICAgICBcIlF1ZWVuJ3NfUGF3bl9HYW1lXCIsXG4gICAgICBbXCJkNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkE1N1wiLFxuICAgICAgXCJCZW5rbyBHYW1iaXRcIixcbiAgICAgIFwicm5icWtiMXIvcDJwcHBwcC81bjIvMXBwUDQvMlA1LzgvUFAyUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDRcIixcbiAgICAgIFwiQmVua29fR2FtYml0XCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBjNVwiLCBcImQ1IGI1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTYxXCIsXG4gICAgICBcIkJlbm9uaSBEZWZlbmNlOiBNb2Rlcm4gQmVub25pXCIsXG4gICAgICBcInJuYnFrYjFyL3BwMXAxcHBwLzRwbjIvMnBQNC8yUDUvOC9QUDJQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJNb2Rlcm5fQmVub25pXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBjNVwiLCBcImQ1IGU2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTQzXCIsXG4gICAgICBcIkJlbm9uaSBEZWZlbmNlOiBDemVjaCBCZW5vbmlcIixcbiAgICAgIFwicm5icWtiMXIvcHAxcDFwcHAvNW4yLzJwUHAzLzJQNS84L1BQMlBQUFAvUk5CUUtCTlIgdyBLUWtxIGU2IDAgNFwiLFxuICAgICAgXCJCZW5vbmlfRGVmZW5zZSNDemVjaF9CZW5vbmk6XzEuZDRfTmY2XzIuYzRfYzVfMy5kNV9lNVwiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgYzVcIiwgXCJkNSBlNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkQwMFwiLFxuICAgICAgXCJCbGFja21hciBHYW1iaXRcIixcbiAgICAgIFwicm5icWtibnIvcHBwMXBwcHAvOC8zcDQvM1BQMy84L1BQUDJQUFAvUk5CUUtCTlIgYiBLUWtxIC0gMCAyXCIsXG4gICAgICBcIkJsYWNrbWFy4oCTRGllbWVyX0dhbWJpdFwiLFxuICAgICAgW1wiZDQgZDVcIiwgXCJlNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkUxMVwiLFxuICAgICAgXCJCb2dvLUluZGlhbiBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrMnIvcHBwcDFwcHAvNHBuMi84LzFiUFA0LzVOMi9QUDJQUFBQL1JOQlFLQjFSIHcgS1FrcSAtIDIgNFwiLFxuICAgICAgXCJCb2dvLUluZGlhbl9EZWZlbmNlXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcIk5mMyBCYjQrXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTAwXCIsXG4gICAgICBcIkNhdGFsYW4gT3BlbmluZ1wiLFxuICAgICAgXCJybmJxa2Ixci9wcHBwMXBwcC80cG4yLzgvMlBQNC82UDEvUFAyUFAxUC9STkJRS0JOUiBiIEtRa3EgLSAwIDNcIixcbiAgICAgIFwiQ2F0YWxhbl9PcGVuaW5nXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcImczXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTA2XCIsXG4gICAgICBcIkNhdGFsYW4gT3BlbmluZzogQ2xvc2VkIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxazJyL3BwcDFicHBwLzRwbjIvM3A0LzJQUDQvNU5QMS9QUDJQUEJQL1JOQlFLMlIgYiBLUWtxIC0gMyA1XCIsXG4gICAgICBcIkNhdGFsYW5fT3BlbmluZ1wiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgZTZcIiwgXCJnMyBkNVwiLCBcIk5mMyBCZTdcIiwgXCJCZzJcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBODBcIixcbiAgICAgIFwiRHV0Y2ggRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Juci9wcHBwcDFwcC84LzVwMi8zUDQvOC9QUFAxUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDJcIixcbiAgICAgIFwiRHV0Y2hfRGVmZW5jZVwiLFxuICAgICAgW1wiZDQgZjVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBOTZcIixcbiAgICAgIFwiRHV0Y2ggRGVmZW5jZTogQ2xhc3NpY2FsIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxMXJrMS9wcHAxYjFwcC8zcHBuMi81cDIvMlBQNC81TlAxL1BQMlBQQlAvUk5CUTFSSzEgdyAtIC0gMCA3XCIsXG4gICAgICBcIkR1dGNoX0RlZmVuY2VcIixcbiAgICAgIFtcImQ0IGY1XCIsIFwiYzQgTmY2XCIsIFwiZzMgZTZcIiwgXCJCZzIgQmU3XCIsIFwiTmYzIE8tT1wiLCBcIk8tTyBkNlwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkE4N1wiLFxuICAgICAgXCJEdXRjaCBEZWZlbmNlOiBMZW5pbmdyYWQgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrMnIvcHBwcHAxYnAvNW5wMS81cDIvMlBQNC81TlAxL1BQMlBQQlAvUk5CUUsyUiBiIEtRa3EgLSAzIDVcIixcbiAgICAgIFwiRHV0Y2hfRGVmZW5jZVwiLFxuICAgICAgW1wiZDQgZjVcIiwgXCJjNCBOZjZcIiwgXCJnMyBnNlwiLCBcIkJnMiBCZzdcIiwgXCJOZjNcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBODNcIixcbiAgICAgIFwiRHV0Y2ggRGVmZW5jZTogU3RhdW50b24gR2FtYml0XCIsXG4gICAgICBcInJuYnFrYjFyL3BwcHBwMXBwLzVuMi82QjEvM1BwMy8yTjUvUFBQMlBQUC9SMlFLQk5SIGIgS1FrcSAtIDMgNFwiLFxuICAgICAgXCJEdXRjaF9EZWZlbmNlXCIsXG4gICAgICBbXCJkNCBmNVwiLCBcImU0IGZ4ZTRcIiwgXCJOYzMgTmY2XCIsIFwiQmc1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTkyXCIsXG4gICAgICBcIkR1dGNoIERlZmVuY2U6IFN0b25ld2FsbCBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icTFyazEvcHBwMWIxcHAvNHBuMi8zcDFwMi8yUFA0LzVOUDEvUFAyUFBCUC9STkJRMVJLMSB3IC0gLSAwIDdcIixcbiAgICAgIFwiRHV0Y2hfRGVmZW5jZVwiLFxuICAgICAgW1wiZDQgZjVcIiwgXCJjNCBOZjZcIiwgXCJnMyBlNlwiLCBcIkJnMiBCZTdcIiwgXCJOZjMgTy1PXCIsIFwiTy1PIGQ1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDgwXCIsXG4gICAgICBcIkdyw7xuZmVsZCBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYjFyL3BwcDFwcDFwLzVucDEvM3A0LzJQUDQvMk41L1BQMlBQUFAvUjFCUUtCTlIgdyBLUWtxIC0gMCA0XCIsXG4gICAgICBcIkdyw7xuZmVsZF9EZWZlbmNlXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBkNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkQ4MlwiLFxuICAgICAgXCJHcsO8bmZlbGQgRGVmZW5jZTogQnJpbmNrbWFubiBBdHRhY2tcIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwMXAvNW5wMS8zcDQvMlBQMUIyLzJONS9QUDJQUFBQL1IyUUtCTlIgYiBLUWtxIC0gMSA0XCIsXG4gICAgICBcIkdyw7xuZmVsZF9EZWZlbmNlI0xpbmVzX3dpdGhfNC5CZjRfYW5kX3RoZV9Hci5DMy5CQ25mZWxkX0dhbWJpdFwiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgZzZcIiwgXCJOYzMgZDVcIiwgXCJCZjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJEODVcIixcbiAgICAgIFwiR3LDvG5mZWxkIERlZmVuY2U6IEV4Y2hhbmdlIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHAxcC82cDEvM240LzNQNC8yTjUvUFAyUFBQUC9SMUJRS0JOUiB3IEtRa3EgLSAwIDVcIixcbiAgICAgIFwiR3LDvG5mZWxkX0RlZmVuY2UjRXhjaGFuZ2VfVmFyaWF0aW9uOl80LmN4ZDVfTnhkNV81LmU0XCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBkNVwiLCBcImN4ZDUgTnhkNVwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkQ4MFwiLFxuICAgICAgXCJHcsO8bmZlbGQgRGVmZW5jZTogUnVzc2lhbiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwMXAvNW5wMS8zcDQvMlBQNC8xUU41L1BQMlBQUFAvUjFCMUtCTlIgYiBLUWtxIC0gMSA0XCIsXG4gICAgICBcIkdyw7xuZmVsZF9EZWZlbmNlI1J1c3NpYW5fU3lzdGVtOl80Lk5mM19CZzdfNS5RYjNcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGc2XCIsIFwiTmMzIGQ1XCIsIFwiUWIzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDkwXCIsXG4gICAgICBcIkdyw7xuZmVsZCBEZWZlbmNlOiBUYWltYW5vdiBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsyci9wcHAxcHBicC81bnAxLzNwMkIxLzJQUDQvMk4yTjIvUFAyUFBQUC9SMlFLQjFSIGIgS1FrcSAtIDMgNVwiLFxuICAgICAgXCJHcsO8bmZlbGRfRGVmZW5jZSNUYWltYW5vdi4yN3NfVmFyaWF0aW9uX3dpdGhfNC5OZjNfQmc3XzUuQmc1XCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBkNVwiLCBcIk5mMyBCZzdcIiwgXCJCZzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFNjFcIixcbiAgICAgIFwiS2luZydzIEluZGlhbiBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYjFyL3BwcHBwcDFwLzVucDEvOC8yUFA0LzgvUFAyUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDNcIixcbiAgICAgIFwiS2luZydzX0luZGlhbl9EZWZlbmNlXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkU3N1wiLFxuICAgICAgXCJLaW5nJ3MgSW5kaWFuIERlZmVuY2U6IDQuZTRcIixcbiAgICAgIFwicm5icWsyci9wcHAxcHBicC8zcDFucDEvOC8yUFBQMy8yTjUvUFAzUFBQL1IxQlFLQk5SIHcgS1FrcSAtIDAgNVwiLFxuICAgICAgXCJLaW5nJ3NfSW5kaWFuX0RlZmVuY2VcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGc2XCIsIFwiTmMzIEJnN1wiLCBcImU0IGQ2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTczXCIsXG4gICAgICBcIktpbmcncyBJbmRpYW4gRGVmZW5jZTogQXZlcmJha2ggVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnExcmsxL3BwcDFwcGJwLzNwMW5wMS82QjEvMlBQUDMvMk41L1BQMkJQUFAvUjJRSzFOUiBiIEtRIC0gMyA2XCIsXG4gICAgICBcIktpbmcnc19JbmRpYW5fRGVmZW5jZSNBdmVyYmFraF9WYXJpYXRpb246XzUuQmUyXzAtMF82LkJnNVwiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgZzZcIiwgXCJOYzMgQmc3XCIsIFwiZTQgZDZcIiwgXCJCZTIgTy1PXCIsIFwiQmc1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTYyXCIsXG4gICAgICBcIktpbmcncyBJbmRpYW4gRGVmZW5jZTogRmlhbmNoZXR0byBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsyci9wcHAxcHBicC8zcDFucDEvOC8yUFA0LzJOMk5QMS9QUDJQUDFQL1IxQlFLQjFSIGIgS1FrcSAtIDAgNVwiLFxuICAgICAgXCJLaW5nJ3NfSW5kaWFuX0RlZmVuY2UjRmlhbmNoZXR0b19WYXJpYXRpb246XzMuTmYzX0JnN180LmczXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBCZzdcIiwgXCJOZjMgZDZcIiwgXCJnM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkU3NlwiLFxuICAgICAgXCJLaW5nJ3MgSW5kaWFuIERlZmVuY2U6IEZvdXIgUGF3bnMgQXR0YWNrXCIsXG4gICAgICBcInJuYnFrMnIvcHBwMXBwYnAvM3AxbnAxLzgvMlBQUFAyLzJONS9QUDRQUC9SMUJRS0JOUiBiIEtRa3EgLSAwIDVcIixcbiAgICAgIFwiS2luZyUyN3NfSW5kaWFuX0RlZmVuY2UsX0ZvdXJfUGF3bnNfQXR0YWNrXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBCZzdcIiwgXCJlNCBkNlwiLCBcImY0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTkxXCIsXG4gICAgICBcIktpbmcncyBJbmRpYW4gRGVmZW5jZTogQ2xhc3NpY2FsIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxMXJrMS9wcHAxcHBicC8zcDFucDEvOC8yUFBQMy8yTjJOMi9QUDJCUFBQL1IxQlFLMlIgYiBLUSAtIDMgNlwiLFxuICAgICAgXCJLaW5nJ3NfSW5kaWFuX0RlZmVuY2UjQ2xhc3NpY2FsX1ZhcmlhdGlvbjpfNS5OZjNfMC0wXzYuQmUyX2U1XCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBnNlwiLCBcIk5jMyBCZzdcIiwgXCJlNCBkNlwiLCBcIk5mMyBPLU9cIiwgXCJCZTJcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFODBcIixcbiAgICAgIFwiS2luZydzIEluZGlhbiBEZWZlbmNlOiBTw6RtaXNjaCBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsyci9wcHAxcHBicC8zcDFucDEvOC8yUFBQMy8yTjJQMi9QUDRQUC9SMUJRS0JOUiBiIEtRa3EgLSAwIDVcIixcbiAgICAgIFwiS2luZydzX0luZGlhbl9EZWZlbmNlI1MuQzMuQTRtaXNjaF9WYXJpYXRpb246XzUuZjNcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGc2XCIsIFwiTmMzIEJnN1wiLCBcImU0IGQ2XCIsIFwiZjNcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBNDFcIixcbiAgICAgIFwiUXVlZW5zJ3MgUGF3biBHYW1lOiBNb2Rlcm4gRGVmZW5jZVwiLFxuICAgICAgXCJybmJxazFuci9wcHAxcHBicC8zcDJwMS84LzJQUDQvMk41L1BQMlBQUFAvUjFCUUtCTlIgdyBLUWtxIC0gMiA0XCIsXG4gICAgICBcIlF1ZWVuJ3NfUGF3bl9HYW1lIzEuLi5nNlwiLFxuICAgICAgW1wiZDQgZzZcIiwgXCJjNCBkNlwiLCBcIk5jMyBCZzdcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFMjBcIixcbiAgICAgIFwiTmltem8tSW5kaWFuIERlZmVuY2VcIixcbiAgICAgIFwicm5icWsyci9wcHBwMXBwcC80cG4yLzgvMWJQUDQvMk41L1BQMlBQUFAvUjFCUUtCTlIgdyBLUWtxIC0gMiA0XCIsXG4gICAgICBcIk5pbXpvLUluZGlhbl9EZWZlbmNlXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcIk5jMyBCYjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFMzJcIixcbiAgICAgIFwiTmltem8tSW5kaWFuIERlZmVuY2U6IENsYXNzaWNhbCBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsyci9wcHBwMXBwcC80cG4yLzgvMWJQUDQvMk41L1BQUTFQUFBQL1IxQjFLQk5SIGIgS1FrcSAtIDMgNFwiLFxuICAgICAgXCJOaW16by1JbmRpYW5fRGVmZW5jZSNDbGFzc2ljYWxfVmFyaWF0aW9uOl80LlFjMlwiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgZTZcIiwgXCJOYzMgQmI0XCIsIFwiUWMyXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTQzXCIsXG4gICAgICBcIk5pbXpvLUluZGlhbiBEZWZlbmNlOiBGaXNjaGVyIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxazJyL3AxcHAxcHBwLzFwMnBuMi84LzFiUFA0LzJOMVAzL1BQM1BQUC9SMUJRS0JOUiB3IEtRa3EgLSAwIDVcIixcbiAgICAgIFwiTmltem8tSW5kaWFuX0RlZmVuY2UjNC4uLmI2XCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcIk5jMyBCYjRcIiwgXCJlMyBiNlwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkU0MVwiLFxuICAgICAgXCJOaW16by1JbmRpYW4gRGVmZW5jZTogSMO8Ym5lciBWYXJpYXRpb25cIixcbiAgICAgIFwicjFicWsyci9wcDNwcHAvMm5wcG4yLzJwNS8yUFA0LzJQQlBOMi9QNFBQUC9SMUJRSzJSIHcgS1FrcSAtIDAgOFwiLFxuICAgICAgXCJOaW16by1JbmRpYW5fRGVmZW5jZSM0Li4uYzVcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGU2XCIsIFwiTmMzIEJiNFwiLCBcImUzIGM1XCIsIFwiQmQzIE5jNlwiLCBcIk5mMyBCeGMzK1wiLCBcImJ4YzMgZDZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFMjFcIixcbiAgICAgIFwiTmltem8tSW5kaWFuIERlZmVuY2U6IEthc3Bhcm92IFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxazJyL3BwcHAxcHBwLzRwbjIvOC8xYlBQNC8yTjJOMi9QUDJQUFBQL1IxQlFLQjFSIGIgS1FrcSAtIDMgNFwiLFxuICAgICAgXCJOaW16by1JbmRpYW5fRGVmZW5jZSNLYXNwYXJvdl9WYXJpYXRpb246XzQuTmYzXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcIk5jMyBCYjRcIiwgXCJOZjNcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFMzBcIixcbiAgICAgIFwiTmltem8tSW5kaWFuIERlZmVuY2U6IExlbmluZ3JhZCBWYXJpYXRpb25cIixcbiAgICAgIFwicm5icWsyci9wcHBwMXBwcC80cG4yLzZCMS8xYlBQNC8yTjUvUFAyUFBQUC9SMlFLQk5SIGIgS1FrcSAtIDMgNFwiLFxuICAgICAgXCJOaW16by1JbmRpYW5fRGVmZW5jZSNPdGhlcl92YXJpYXRpb25zXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBlNlwiLCBcIk5jMyBCYjRcIiwgXCJCZzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJFMjZcIixcbiAgICAgIFwiTmltem8tSW5kaWFuIERlZmVuY2U6IFPDpG1pc2NoIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxazJyL3BwcHAxcHBwLzRwbjIvOC8yUFA0L1AxUDUvNFBQUFAvUjFCUUtCTlIgYiBLUWtxIC0gMCA1XCIsXG4gICAgICBcIk5pbXpvLUluZGlhbl9EZWZlbmNlI090aGVyX3ZhcmlhdGlvbnNcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGU2XCIsIFwiTmMzIEJiNFwiLCBcImEzIEJ4YzMrXCIsIFwiYnhjM1wiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkE1M1wiLFxuICAgICAgXCJPbGQgSW5kaWFuIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwcHAvM3AxbjIvOC8yUFA0LzgvUFAyUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDNcIixcbiAgICAgIFwiT2xkX0luZGlhbl9EZWZlbnNlXCIsXG4gICAgICBbXCJkNCBOZjZcIiwgXCJjNCBkNlwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkQwNlwiLFxuICAgICAgXCJRdWVlbidzIEdhbWJpdFwiLFxuICAgICAgXCJybmJxa2Juci9wcHAxcHBwcC84LzNwNC8yUFA0LzgvUFAyUFBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDJcIixcbiAgICAgIFwiUXVlZW4nc19HYW1iaXRcIixcbiAgICAgIFtcImQ0IGQ1XCIsIFwiYzRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJEMjBcIixcbiAgICAgIFwiUXVlZW4ncyBHYW1iaXQgQWNjZXB0ZWRcIixcbiAgICAgIFwicm5icWtibnIvcHBwMXBwcHAvOC84LzJwUDQvOC9QUDJQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJRdWVlbiUyN3NfR2FtYml0X0FjY2VwdGVkXCIsXG4gICAgICBbXCJkNCBkNVwiLCBcImM0IGR4YzRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJENDNcIixcbiAgICAgIFwiUXVlZW4ncyBHYW1iaXQgRGVjbGluZWQ6IFNlbWktU2xhdiBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYjFyL3BwM3BwcC8ycDFwbjIvM3A0LzJQUDQvMk4yTjIvUFAyUFBQUC9SMUJRS0IxUiB3IEtRa3EgLSAwIDVcIixcbiAgICAgIFwiU2VtaS1TbGF2X0RlZmVuc2VcIixcbiAgICAgIFtcImQ0IGQ1XCIsIFwiYzQgZTZcIiwgXCJOYzMgTmY2XCIsIFwiTmYzIGM2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDEwXCIsXG4gICAgICBcIlF1ZWVuJ3MgR2FtYml0IERlY2xpbmVkOiBTbGF2IERlZmVuY2VcIixcbiAgICAgIFwicm5icWtibnIvcHAycHBwcC8ycDUvM3A0LzJQUDQvOC9QUDJQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJTbGF2X0RlZmVuc2VcIixcbiAgICAgIFtcImQ0IGQ1XCIsIFwiYzQgYzZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJENDBcIixcbiAgICAgIFwiUXVlZW4ncyBHYW1iaXQgRGVjbGluZWQ6IFNlbWktVGFycmFzY2ggRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Ixci9wcDNwcHAvNHBuMi8ycHA0LzJQUDQvMk4yTjIvUFAyUFBQUC9SMUJRS0IxUiB3IEtRa3EgLSAwIDVcIixcbiAgICAgIFwiVGFycmFzY2hfRGVmZW5zZSNTZW1pLVRhcnJhc2NoX0RlZmVuc2VcIixcbiAgICAgIFtcImQ0IGQ1XCIsIFwiYzQgZTZcIiwgXCJOYzMgTmY2XCIsIFwiTmYzIGM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDMyXCIsXG4gICAgICBcIlF1ZWVuJ3MgR2FtYml0IERlY2xpbmVkOiBUYXJyYXNjaCBEZWZlbmNlXCIsXG4gICAgICBcInJuYnFrYm5yL3BwM3BwcC80cDMvMnBwNC8yUFA0LzJONS9QUDJQUFBQL1IxQlFLQk5SIHcgS1FrcSAtIDAgNFwiLFxuICAgICAgXCJUYXJyYXNjaF9EZWZlbnNlXCIsXG4gICAgICBbXCJkNCBkNVwiLCBcImM0IGU2XCIsIFwiTmMzIGM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDA4XCIsXG4gICAgICBcIlF1ZWVuJ3MgR2FtYml0OiBBbGJpbiBDb3VudGVyZ2FtYml0XCIsXG4gICAgICBcInJuYnFrYm5yL3BwcDJwcHAvOC8zcHAzLzJQUDQvOC9QUDJQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJBbGJpbl9Db3VudGVyZ2FtYml0XCIsXG4gICAgICBbXCJkNCBkNVwiLCBcImM0IGU1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDA3XCIsXG4gICAgICBcIlF1ZWVuJ3MgR2FtYml0OiBDaGlnb3JpbiBEZWZlbmNlXCIsXG4gICAgICBcInIxYnFrYm5yL3BwcDFwcHBwLzJuNS8zcDQvMlBQNC84L1BQMlBQUFAvUk5CUUtCTlIgdyBLUWtxIC0gMSAzXCIsXG4gICAgICBcIkNoaWdvcmluX0RlZmVuc2VcIixcbiAgICAgIFtcImQ0IGQ1XCIsIFwiYzQgTmM2XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRTEyXCIsXG4gICAgICBcIlF1ZWVuJ3MgSW5kaWFuIERlZmVuY2VcIixcbiAgICAgIFwicm5icWtiMXIvcDFwcDFwcHAvMXAycG4yLzgvMlBQNC81TjIvUFAyUFBQUC9STkJRS0IxUiB3IEtRa3EgLSAwIDRcIixcbiAgICAgIFwiUXVlZW4nc19JbmRpYW5fRGVmZW5zZVwiLFxuICAgICAgW1wiZDQgTmY2XCIsIFwiYzQgZTZcIiwgXCJOZjMgYjZcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJEMDJcIixcbiAgICAgIFwiTG9uZG9uIFN5c3RlbVwiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHBwcC81bjIvM3A0LzNQMUIyLzVOMi9QUFAxUFBQUC9STjFRS0IxUiBiIEtRa3EgLSAzIDNcIixcbiAgICAgIFwiTG9uZG9uX1N5c3RlbVwiLFxuICAgICAgW1wiZDQgZDVcIiwgXCJOZjMgTmY2XCIsIFwiQmY0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDAwXCIsXG4gICAgICBcIkxvbmRvbiBTeXN0ZW06IE1hc29uIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Juci9wcHAxcHBwcC84LzNwNC8zUDFCMi84L1BQUDFQUFBQL1JOMVFLQk5SIGIgS1FrcSAtIDEgMlwiLFxuICAgICAgXCJMb25kb25fU3lzdGVtXCIsXG4gICAgICBbXCJkNCBkNVwiLCBcIkJmNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkQwMVwiLFxuICAgICAgXCJSYXBwb3J0LUpvYmF2YSBTeXN0ZW1cIixcbiAgICAgIFwicm5icWtiMXIvcHBwMXBwcHAvNW4yLzNwNC8zUDFCMi8yTjUvUFBQMVBQUFAvUjJRS0JOUiBiIEtRa3EgLSAzIDNcIixcbiAgICAgIFwiTG9uZG9uX1N5c3RlbVwiLFxuICAgICAgW1wiZDQgZDVcIiwgXCJOYzMgTmY2XCIsIFwiQmY0XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDAzXCIsXG4gICAgICBcIlRvcnJlIEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHBwcC81bjIvM3AyQjEvM1A0LzVOMi9QUFAxUFBQUC9STjFRS0IxUiBiIEtRa3EgLSAzIDNcIixcbiAgICAgIFwiVG9ycmVfQXR0YWNrXCIsXG4gICAgICBbXCJkNCBkNVwiLCBcIk5mMyBOZjZcIiwgXCJCZzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJEMDFcIixcbiAgICAgIFwiUmljaHRlci1WZXJlc292IEF0dGFja1wiLFxuICAgICAgXCJybmJxa2Ixci9wcHAxcHBwcC81bjIvM3AyQjEvM1A0LzJONS9QUFAxUFBQUC9SMlFLQk5SIGIgS1FrcSAtIDMgM1wiLFxuICAgICAgXCJSaWNodGVyLVZlcmVzb3ZfQXR0YWNrXCIsXG4gICAgICBbXCJkNCBkNVwiLCBcIk5jMyBOZjZcIiwgXCJCZzVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBNTJcIixcbiAgICAgIFwiQnVkYXBlc3QgRGVmZW5jZVwiLFxuICAgICAgXCJybmJxa2Ixci9wcHBwMXBwcC81bjIvNHAzLzJQUDQvOC9QUDJQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgM1wiLFxuICAgICAgXCJCdWRhcGVzdF9HYW1iaXRcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcImM0IGU1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiRDAwXCIsXG4gICAgICBcIkNsb3NlZCBHYW1lXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcDFwcHBwLzgvM3A0LzNQNC84L1BQUDFQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJDbG9zZWRfR2FtZVwiLFxuICAgICAgW1wiZDQgZDVcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBNDVcIixcbiAgICAgIFwiVHJvbXBvd3NreSBBdHRhY2tcIixcbiAgICAgIFwicm5icWtiMXIvcHBwcHBwcHAvNW4yLzZCMS8zUDQvOC9QUFAxUFBQUC9STjFRS0JOUiBiIEtRa3EgLSAyIDJcIixcbiAgICAgIFwiVHJvbXBvd3NreV9BdHRhY2tcIixcbiAgICAgIFtcImQ0IE5mNlwiLCBcIkJnNVwiXVxuICAgICksXG4gIF0pLFxuICBuZXcgQ2F0ZWdvcnkoXCJOZjNcIiwgW1xuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBMDRcIixcbiAgICAgIFwiWnVrZXJ0b3J0IE9wZW5pbmdcIixcbiAgICAgIFwicm5icWtibnIvcHBwcHBwcHAvOC84LzgvNU4yL1BQUFBQUFBQL1JOQlFLQjFSIGIgS1FrcSAtIDEgMVwiLFxuICAgICAgXCJadWtlcnRvcnRfT3BlbmluZ1wiLFxuICAgICAgW1wiTmYzXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTA3XCIsXG4gICAgICBcIktpbmcncyBJbmRpYW4gQXR0YWNrXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcDFwcHBwLzgvM3A0LzgvNU5QMS9QUFBQUFAxUC9STkJRS0IxUiBiIEtRa3EgLSAwIDJcIixcbiAgICAgIFwiS2luZydzX0luZGlhbl9BdHRhY2tcIixcbiAgICAgIFtcIk5mMyBkNVwiLCBcImczXCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTA5XCIsXG4gICAgICBcIlLDqXRpIE9wZW5pbmdcIixcbiAgICAgIFwicm5icWtibnIvcHBwMXBwcHAvOC8zcDQvMlA1LzVOMi9QUDFQUFBQUC9STkJRS0IxUiBiIEtRa3EgLSAwIDJcIixcbiAgICAgIFwiUsOpdGlfT3BlbmluZ1wiLFxuICAgICAgW1wiTmYzIGQ1XCIsIFwiYzRcIl1cbiAgICApLFxuICBdKSxcbiAgbmV3IENhdGVnb3J5KFwiYzRcIiwgW1xuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBMTBcIixcbiAgICAgIFwiRW5nbGlzaCBPcGVuaW5nXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHBwcHBwLzgvOC8yUDUvOC9QUDFQUFBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDFcIixcbiAgICAgIFwiRW5nbGlzaF9PcGVuaW5nXCIsXG4gICAgICBbXCJjNFwiXVxuICAgICksXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkEyMFwiLFxuICAgICAgXCJFbmdsaXNoIE9wZW5pbmc6IFJldmVyc2VkIFNpY2lsaWFuXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHAxcHBwLzgvNHAzLzJQNS84L1BQMVBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJFbmdsaXNoX09wZW5pbmdcIixcbiAgICAgIFtcImM0IGU1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTMwXCIsXG4gICAgICBcIkVuZ2xpc2ggT3BlbmluZzogU3ltbWV0cmljYWwgVmFyaWF0aW9uXCIsXG4gICAgICBcInJuYnFrYm5yL3BwMXBwcHBwLzgvMnA1LzJQNS84L1BQMVBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMlwiLFxuICAgICAgXCJFbmdsaXNoX09wZW5pbmdcIixcbiAgICAgIFtcImM0IGM1XCJdXG4gICAgKSxcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTI2XCIsXG4gICAgICBcIkVuZ2xpc2ggT3BlbmluZzogQ2xvc2VkIFN5c3RlbVwiLFxuICAgICAgXCJyMWJxazFuci9wcHAycGJwLzJucDJwMS80cDMvMlA1LzJOUDJQMS9QUDJQUEJQL1IxQlFLMU5SIHcgS1FrcSAtIDAgNlwiLFxuICAgICAgXCJFbmdsaXNoX09wZW5pbmdcIixcbiAgICAgIFtcImM0IGU1XCIsIFwiTmMzIE5jNlwiLCBcImczIGc2XCIsIFwiQmcyIEJnN1wiLCBcImQzIGQ2XCJdXG4gICAgKSxcbiAgXSksXG4gIG5ldyBDYXRlZ29yeShcImIzXCIsIFtcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTAxXCIsXG4gICAgICBcIk5pbXpvLUxhcnNlbiBBdHRhY2tcIixcbiAgICAgIFwicm5icWtibnIvcHBwcHBwcHAvOC84LzgvMVA2L1AxUFBQUFBQL1JOQlFLQk5SIGIgS1FrcSAtIDAgMVwiLFxuICAgICAgXCJMYXJzZW4nc19PcGVuaW5nXCIsXG4gICAgICBbXCJiM1wiXVxuICAgICksXG4gIF0pLFxuICBuZXcgQ2F0ZWdvcnkoXCJiNFwiLCBbXG4gICAgbmV3IFN0YXJ0aW5nUG9zaXRpb24oXG4gICAgICBcIkEwMFwiLFxuICAgICAgXCJTb2tvbHNreSBPcGVuaW5nXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHBwcHBwLzgvOC8xUDYvOC9QMVBQUFBQUC9STkJRS0JOUiBiIEtRa3EgLSAwIDFcIixcbiAgICAgIFwiU29rb2xza3lfT3BlbmluZ1wiLFxuICAgICAgW1wiYjRcIl1cbiAgICApLFxuICBdKSxcbiAgbmV3IENhdGVnb3J5KFwiZjRcIiwgW1xuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBMDJcIixcbiAgICAgIFwiQmlyZCdzIE9wZW5pbmdcIixcbiAgICAgIFwicm5icWtibnIvcHBwcHBwcHAvOC84LzVQMi84L1BQUFBQMVBQL1JOQlFLQk5SIGIgS1FrcSAtIDAgMVwiLFxuICAgICAgXCJCaXJkJ3NfT3BlbmluZ1wiLFxuICAgICAgW1wiZjRcIl1cbiAgICApLFxuICAgIG5ldyBTdGFydGluZ1Bvc2l0aW9uKFxuICAgICAgXCJBMDJcIixcbiAgICAgIFwiQmlyZCdzIE9wZW5pbmc6IER1dGNoIFZhcmlhdGlvblwiLFxuICAgICAgXCJybmJxa2Juci9wcHAxcHBwcC84LzNwNC81UDIvOC9QUFBQUDFQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDJcIixcbiAgICAgIFwiQmlyZCdzX09wZW5pbmdcIixcbiAgICAgIFtcImY0IGQ1XCJdXG4gICAgKSxcbiAgXSksXG4gIG5ldyBDYXRlZ29yeShcImczXCIsIFtcbiAgICBuZXcgU3RhcnRpbmdQb3NpdGlvbihcbiAgICAgIFwiQTAwXCIsXG4gICAgICBcIkh1bmdhcmlhbiBPcGVuaW5nXCIsXG4gICAgICBcInJuYnFrYm5yL3BwcHBwcHBwLzgvOC84LzZQMS9QUFBQUFAxUC9STkJRS0JOUiBiIEtRa3EgLSAwIDFcIixcbiAgICAgIFwiS2luZydzX0ZpYW5jaGV0dG9fT3BlbmluZ1wiLFxuICAgICAgW1wiZzNcIl1cbiAgICApLFxuICBdKSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNhdGVnb3JpZXM7XG4iLCJpbXBvcnQgeyBzZXRJY29uLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBDaGVzc2VyIH0gZnJvbSBcIi4vQ2hlc3NlclwiO1xuaW1wb3J0IHN0YXJ0aW5nUG9zaXRvbnMgZnJvbSBcIi4vc3RhcnRpbmdQb3NpdGlvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlc3Nlck1lbnUge1xuICBwcml2YXRlIGNoZXNzZXI6IENoZXNzZXI7XG4gIHByaXZhdGUgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgbW92ZXNMaXN0RWw6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudEVsOiBIVE1MRWxlbWVudCwgY2hlc3NlcjogQ2hlc3Nlcikge1xuICAgIHRoaXMuY2hlc3NlciA9IGNoZXNzZXI7XG5cbiAgICB0aGlzLmNvbnRhaW5lckVsID0gcGFyZW50RWwuY3JlYXRlRGl2KFwiY2hlc3MtbWVudS1jb250YWluZXJcIiwgKGNvbnRhaW5lckVsKSA9PiB7XG4gICAgICBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiY2hlc3MtbWVudS1zZWN0aW9uXCIgfSwgKHNlY3Rpb25FbCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RFbCA9IHNlY3Rpb25FbC5jcmVhdGVFbChcbiAgICAgICAgICBcInNlbGVjdFwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsczogXCJkcm9wZG93biBjaGVzcy1zdGFydGluZy1wb3NpdGlvbi1kcm9wZG93blwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiBcInN0YXJ0aW5nLXBvc2l0aW9uXCIsXG4gICAgICAgICAgICAgIHRleHQ6IFwiU3RhcnRpbmcgUG9zaXRpb25cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWwuY3JlYXRlRWwoXCJvcHRpb25cIiwge1xuICAgICAgICAgICAgICB2YWx1ZTogXCJjdXN0b21cIixcbiAgICAgICAgICAgICAgdGV4dDogXCJDdXN0b21cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWwuY3JlYXRlRWwoXCJvcHRncm91cFwiLCB7fSwgKG9wdGdyb3VwKSA9PiB7XG4gICAgICAgICAgICAgIG9wdGdyb3VwLmxhYmVsID0gXCJQb3B1bGFyIE9wZW5pbmdzXCI7XG4gICAgICAgICAgICAgIHN0YXJ0aW5nUG9zaXRvbnMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICBvcHRncm91cC5jcmVhdGVFbChcIm9wdGlvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLmVjbyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0aW5nUG9zaXRpb24gPSB0aGlzLmdldFN0YXJ0aW5nUG9zaXRpb25Gcm9tRmVuKGNoZXNzZXIuZ2V0RmVuKCkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRpbmdQb3NpdGlvbk5hbWUgPSBzdGFydGluZ1Bvc2l0aW9uXG4gICAgICAgICAgICAgID8gc3RhcnRpbmdQb3NpdGlvbi5lY29cbiAgICAgICAgICAgICAgOiBcImN1c3RvbVwiO1xuICAgICAgICAgICAgZWwudmFsdWUgPSBzdGFydGluZ1Bvc2l0aW9uTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgc2VsZWN0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IChldi50YXJnZXQgYXMgYW55KS52YWx1ZTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJzdGFydGluZy1wb3NpdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmNoZXNzZXIubG9hZEZlbihcbiAgICAgICAgICAgICAgXCJybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMVwiLFxuICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdGFydGluZ1Bvc2l0aW9uID0gc3RhcnRpbmdQb3NpdG9uc1xuICAgICAgICAgICAgLmZsYXRNYXAoKGNhdCkgPT4gY2F0Lml0ZW1zKVxuICAgICAgICAgICAgLmZpbmQoKGl0ZW0pID0+IGl0ZW0uZWNvID09PSB2YWx1ZSk7XG5cbiAgICAgICAgICB0aGlzLmNoZXNzZXIubG9hZEZlbihzdGFydGluZ1Bvc2l0aW9uLmZlbiwgc3RhcnRpbmdQb3NpdGlvbi5tb3Zlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKHNlY3Rpb25FbCkuc2V0TmFtZShcIkVuYWJsZSBGcmVlIE1vdmU/XCIpLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMuY2hlc3Nlci5nZXRCb2FyZFN0YXRlKCkubW92YWJsZS5mcmVlKTtcbiAgICAgICAgICB0b2dnbGUub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZXNzZXIuc2V0RnJlZU1vdmUodmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb3Zlc0xpc3RFbCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlRGl2KHtcbiAgICAgIGNsczogXCJjaGVzcy1tZW51LXNlY3Rpb24gY2hlc3MtbWVudS1zZWN0aW9uLXRhbGxcIixcbiAgICB9KTtcblxuICAgIHRoaXMucmVkcmF3TW92ZUxpc3QoKTtcbiAgICB0aGlzLmNyZWF0ZVRvb2xiYXIoKTtcbiAgfVxuXG4gIGdldFN0YXJ0aW5nUG9zaXRpb25Gcm9tRmVuKGZlbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0YXJ0aW5nUG9zaXRvbnMuZmxhdE1hcCgoY2F0KSA9PiBjYXQuaXRlbXMpLmZpbmQoKGl0ZW0pID0+IGl0ZW0uZWNvID09PSBmZW4pO1xuICB9XG5cbiAgY3JlYXRlVG9vbGJhcigpIHtcbiAgICBjb25zdCBidG5Db250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZURpdihcImNoZXNzLXRvb2xiYXItY29udGFpbmVyXCIpO1xuICAgIGJ0bkNvbnRhaW5lci5jcmVhdGVFbChcImFcIiwgXCJ2aWV3LWFjdGlvblwiLCAoYnRuOiBIVE1MQW5jaG9yRWxlbWVudCkgPT4ge1xuICAgICAgYnRuLmFyaWFMYWJlbCA9IFwiRmxpcCBib2FyZFwiO1xuICAgICAgc2V0SWNvbihidG4sIFwic3dpdGNoXCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2hlc3Nlci5mbGlwQm9hcmQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYnRuQ29udGFpbmVyLmNyZWF0ZUVsKFwiYVwiLCBcInZpZXctYWN0aW9uXCIsIChidG46IEhUTUxBbmNob3JFbGVtZW50KSA9PiB7XG4gICAgICBidG4uYXJpYUxhYmVsID0gXCJSZXNldFwiO1xuICAgICAgc2V0SWNvbihidG4sIFwicmVzdG9yZS1maWxlLWdseXBoXCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmNoZXNzZXIuY3VycmVudE1vdmVJZHggPj0gMCkge1xuICAgICAgICAgIHRoaXMuY2hlc3Nlci51bmRvX21vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBidG5Db250YWluZXIuY3JlYXRlRWwoXCJhXCIsIFwidmlldy1hY3Rpb25cIiwgKGJ0bjogSFRNTEFuY2hvckVsZW1lbnQpID0+IHtcbiAgICAgIGJ0bi5hcmlhTGFiZWwgPSBcIlVuZG9cIjtcbiAgICAgIHNldEljb24oYnRuLCBcImxlZnQtYXJyb3dcIik7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jaGVzc2VyLnVuZG9fbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBidG5Db250YWluZXIuY3JlYXRlRWwoXCJhXCIsIFwidmlldy1hY3Rpb25cIiwgKGJ0bjogSFRNTEFuY2hvckVsZW1lbnQpID0+IHtcbiAgICAgIGJ0bi5hcmlhTGFiZWwgPSBcIlJlZG9cIjtcbiAgICAgIHNldEljb24oYnRuLCBcInJpZ2h0LWFycm93XCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2hlc3Nlci5yZWRvX21vdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYnRuQ29udGFpbmVyLmNyZWF0ZUVsKFwiYVwiLCBcInZpZXctYWN0aW9uXCIsIChidG46IEhUTUxBbmNob3JFbGVtZW50KSA9PiB7XG4gICAgICBidG4uYXJpYUxhYmVsID0gXCJDb3B5IEZFTlwiO1xuICAgICAgc2V0SWNvbihidG4sIFwidHdvLWJsYW5rLXBhZ2VzXCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMuY2hlc3Nlci5nZXRGZW4oKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZHJhd01vdmVMaXN0KCkge1xuICAgIHRoaXMubW92ZXNMaXN0RWwuZW1wdHkoKTtcbiAgICB0aGlzLm1vdmVzTGlzdEVsLmNyZWF0ZURpdih7XG4gICAgICB0ZXh0OiB0aGlzLmNoZXNzZXIudHVybigpID09PSBcImJcIiA/IFwiQmxhY2sncyB0dXJuXCIgOiBcIldoaXRlJ3MgdHVyblwiLFxuICAgICAgY2xzOiBcImNoZXNzLXR1cm4tdGV4dFwiLFxuICAgIH0pO1xuICAgIHRoaXMubW92ZXNMaXN0RWwuY3JlYXRlRGl2KFwiY2hlc3MtbW92ZS1saXN0XCIsIChtb3ZlTGlzdEVsKSA9PiB7XG4gICAgICB0aGlzLmNoZXNzZXIuaGlzdG9yeSgpLmZvckVhY2goKG1vdmUsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBtb3ZlRWwgPSBtb3ZlTGlzdEVsLmNyZWF0ZURpdih7XG4gICAgICAgICAgY2xzOiBgY2hlc3MtbW92ZSAke1xuICAgICAgICAgICAgdGhpcy5jaGVzc2VyLmN1cnJlbnRNb3ZlSWR4ID09PSBpZHggPyBcImNoZXNzLW1vdmUtYWN0aXZlXCIgOiBcIlwiXG4gICAgICAgICAgfWAsXG4gICAgICAgICAgdGV4dDogbW92ZS5zYW4sXG4gICAgICAgIH0pO1xuICAgICAgICBtb3ZlRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4ge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jaGVzc2VyLnVwZGF0ZV90dXJuX2lkeChpZHgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJ1ZyhkZWJ1Z0ZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIGlmIChwcm9jZXNzLmVudi5ERUJVRykge1xuICAgIGRlYnVnRm4oKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbmFub2lkIH0gZnJvbSBcIm5hbm9pZFwiO1xuaW1wb3J0IHtcbiAgQXBwLFxuICBFZGl0b3JQb3NpdGlvbixcbiAgTWFya2Rvd25Qb3N0UHJvY2Vzc29yQ29udGV4dCxcbiAgTWFya2Rvd25SZW5kZXJDaGlsZCxcbiAgTWFya2Rvd25WaWV3LFxuICBOb3RpY2UsXG4gIHBhcnNlWWFtbCxcbiAgc3RyaW5naWZ5WWFtbCxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBDaGVzcywgQ2hlc3NJbnN0YW5jZSwgTW92ZSwgU3F1YXJlIH0gZnJvbSBcImNoZXNzLmpzXCI7XG5pbXBvcnQgeyBDaGVzc2dyb3VuZCB9IGZyb20gXCJjaGVzc2dyb3VuZFwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcImNoZXNzZ3JvdW5kL2FwaVwiO1xuaW1wb3J0IHsgQ29sb3IsIEtleSB9IGZyb20gXCJjaGVzc2dyb3VuZC90eXBlc1wiO1xuaW1wb3J0IHsgRHJhd1NoYXBlIH0gZnJvbSBcImNoZXNzZ3JvdW5kL2RyYXdcIjtcblxuaW1wb3J0IHsgQ2hlc3NlckNvbmZpZywgcGFyc2VfdXNlcl9jb25maWcgfSBmcm9tIFwiLi9DaGVzc2VyQ29uZmlnXCI7XG5pbXBvcnQgeyBDaGVzc2VyU2V0dGluZ3MgfSBmcm9tIFwiLi9DaGVzc2VyU2V0dGluZ3NcIjtcbmltcG9ydCBDaGVzc2VyTWVudSBmcm9tIFwiLi9tZW51XCI7XG5cbi8vIFRvIGJ1bmRsZSBhbGwgY3NzIGZpbGVzIGluIHN0eWxlcy5jc3Mgd2l0aCByb2xsdXBcbmltcG9ydCBcIi4uL2Fzc2V0cy9jdXN0b20uY3NzXCI7XG5pbXBvcnQgXCJjaGVzc2dyb3VuZC9hc3NldHMvY2hlc3Nncm91bmQuYmFzZS5jc3NcIjtcbmltcG9ydCBcImNoZXNzZ3JvdW5kL2Fzc2V0cy9jaGVzc2dyb3VuZC5icm93bi5jc3NcIjtcbi8vIFBpZWNlIHN0eWxlc1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9hbHBoYS5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvY2FsaWZvcm5pYS5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvY2FyZGluYWwuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2NidXJuZXR0LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9jaGVzczcuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2NoZXNzbnV0LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9jb21wYW5pb24uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2R1YnJvdm55LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9mYW50YXN5LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9mcmVzY2EuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2dpb2NvLmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9nb3Zlcm5vci5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvaG9yc2V5LmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9pY3BpZWNlcy5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3Mva29zYWwuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2xlaXB6aWcuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL2xldHRlci5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvbGlicmEuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL21hZXN0cm8uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL21lcmlkYS5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvcGlyb3VldHRpLmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9waXhlbC5jc3NcIjtcbmltcG9ydCBcIi4uL2Fzc2V0cy9waWVjZS1jc3MvcmVpbGx5Y3JhaWcuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL3Jpb2hhY2hhLmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL3BpZWNlLWNzcy9zaGFwZXMuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL3NwYXRpYWwuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL3N0YXVudHkuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvcGllY2UtY3NzL3RhdGlhbmEuY3NzXCI7XG4vLyBCb2FyZCBzdHlsZXNcbmltcG9ydCBcIi4uL2Fzc2V0cy9ib2FyZC1jc3MvYnJvd24uY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvYm9hcmQtY3NzL2JsdWUuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvYm9hcmQtY3NzL2dyZWVuLmNzc1wiO1xuaW1wb3J0IFwiLi4vYXNzZXRzL2JvYXJkLWNzcy9wdXJwbGUuY3NzXCI7XG5pbXBvcnQgXCIuLi9hc3NldHMvYm9hcmQtY3NzL2ljLmNzc1wiO1xuaW1wb3J0IGRlYnVnIGZyb20gXCIuL2RlYnVnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2NoZXNzYm9hcmQoYXBwOiBBcHAsIHNldHRpbmdzOiBDaGVzc2VyU2V0dGluZ3MpIHtcbiAgcmV0dXJuIChzb3VyY2U6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50LCBjdHg6IE1hcmtkb3duUG9zdFByb2Nlc3NvckNvbnRleHQpID0+IHtcbiAgICBsZXQgdXNlcl9jb25maWcgPSBwYXJzZV91c2VyX2NvbmZpZyhzZXR0aW5ncywgc291cmNlKTtcbiAgICBjdHguYWRkQ2hpbGQobmV3IENoZXNzZXIoZWwsIGN0eCwgdXNlcl9jb25maWcsIGFwcCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZWFkX3N0YXRlKGlkOiBzdHJpbmcpIHtcbiAgY29uc3Qgc2F2ZWREYXRhU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYGNoZXNzZXItJHtpZH1gKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzYXZlZERhdGFTdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgfVxuICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHdyaXRlX3N0YXRlKGlkOiBzdHJpbmcsIGdhbWVfc3RhdGU6IENoZXNzZXJDb25maWcpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYGNoZXNzZXItJHtpZH1gLCBKU09OLnN0cmluZ2lmeShnYW1lX3N0YXRlKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBDaGVzc2VyIGV4dGVuZHMgTWFya2Rvd25SZW5kZXJDaGlsZCB7XG4gIHByaXZhdGUgY3R4OiBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0O1xuICBwcml2YXRlIGFwcDogQXBwO1xuXG4gIHByaXZhdGUgaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBjZzogQXBpO1xuICBwcml2YXRlIGNoZXNzOiBDaGVzc0luc3RhbmNlO1xuXG4gIHByaXZhdGUgbWVudTogQ2hlc3Nlck1lbnU7XG4gIHByaXZhdGUgbW92ZXM6IE1vdmVbXTtcblxuICBwdWJsaWMgY3VycmVudE1vdmVJZHg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb250YWluZXJFbDogSFRNTEVsZW1lbnQsXG4gICAgY3R4OiBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0LFxuICAgIHVzZXJfY29uZmlnOiBDaGVzc2VyQ29uZmlnLFxuICAgIGFwcDogQXBwXG4gICkge1xuICAgIHN1cGVyKGNvbnRhaW5lckVsKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuaWQgPSB1c2VyX2NvbmZpZy5pZCA/PyBuYW5vaWQoOCk7XG4gICAgdGhpcy5jaGVzcyA9IG5ldyBDaGVzcygpO1xuXG4gICAgY29uc3Qgc2F2ZWRfY29uZmlnID0gcmVhZF9zdGF0ZSh0aGlzLmlkKTtcbiAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB1c2VyX2NvbmZpZywgc2F2ZWRfY29uZmlnKTtcblxuICAgIHRoaXMuc3luY19ib2FyZF93aXRoX2dhbWVzdGF0ZSA9IHRoaXMuc3luY19ib2FyZF93aXRoX2dhbWVzdGF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2F2ZV9tb3ZlID0gdGhpcy5zYXZlX21vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNhdmVfc2hhcGVzID0gdGhpcy5zYXZlX3NoYXBlcy5iaW5kKHRoaXMpO1xuXG4gICAgLy8gU2F2ZSBgaWRgIGludG8gdGhlIGNvZGVibG9jayB5YW1sXG4gICAgaWYgKHVzZXJfY29uZmlnLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgICAgd2luZG93LnNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy53cml0ZV9jb25maWcoeyBpZDogdGhpcy5pZCB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLnBnbikge1xuICAgICAgZGVidWcoKCkgPT4gY29uc29sZS5kZWJ1ZyhcImxvYWRpbmcgZnJvbSBwZ25cIiwgY29uZmlnLnBnbikpO1xuICAgICAgdGhpcy5jaGVzcy5sb2FkX3Bnbihjb25maWcucGduKTtcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5mZW4pIHtcbiAgICAgIGRlYnVnKCgpID0+IGNvbnNvbGUuZGVidWcoXCJsb2FkaW5nIGZyb20gZmVuXCIsIGNvbmZpZy5mZW4pKTtcbiAgICAgIHRoaXMuY2hlc3MubG9hZChjb25maWcuZmVuKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVzID0gY29uZmlnLm1vdmVzID8/IHRoaXMuY2hlc3MuaGlzdG9yeSh7IHZlcmJvc2U6IHRydWUgfSk7XG4gICAgdGhpcy5jdXJyZW50TW92ZUlkeCA9IGNvbmZpZy5jdXJyZW50TW92ZUlkeCA/PyB0aGlzLm1vdmVzLmxlbmd0aCAtIDE7XG5cbiAgICBsZXQgbGFzdE1vdmU6IFtLZXksIEtleV0gPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuY3VycmVudE1vdmVJZHggPj0gMCkge1xuICAgICAgY29uc3QgbW92ZSA9IHRoaXMubW92ZXNbdGhpcy5jdXJyZW50TW92ZUlkeF07XG4gICAgICBsYXN0TW92ZSA9IFttb3ZlLmZyb20sIG1vdmUudG9dO1xuICAgIH1cblxuICAgIC8vIFNldHVwIFVJXG4gICAgdGhpcy5zZXRfc3R5bGUoY29udGFpbmVyRWwsIGNvbmZpZy5waWVjZVN0eWxlLCBjb25maWcuYm9hcmRTdHlsZSk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2cgPSBDaGVzc2dyb3VuZChjb250YWluZXJFbC5jcmVhdGVEaXYoKSwge1xuICAgICAgICBmZW46IHRoaXMuY2hlc3MuZmVuKCksXG4gICAgICAgIGFkZERpbWVuc2lvbnNDc3NWYXJzOiB0cnVlLFxuICAgICAgICBsYXN0TW92ZSxcbiAgICAgICAgb3JpZW50YXRpb246IGNvbmZpZy5vcmllbnRhdGlvbiBhcyBDb2xvcixcbiAgICAgICAgdmlld09ubHk6IGNvbmZpZy52aWV3T25seSxcbiAgICAgICAgZHJhd2FibGU6IHtcbiAgICAgICAgICBlbmFibGVkOiBjb25maWcuZHJhd2FibGUsXG4gICAgICAgICAgb25DaGFuZ2U6IHRoaXMuc2F2ZV9zaGFwZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBuZXcgTm90aWNlKFwiQ2hlc3NlciBlcnJvcjogSW52YWxpZCBjb25maWdcIik7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFjdGl2YXRlcyB0aGUgY2hlc3MgbG9naWNcbiAgICB0aGlzLnNldEZyZWVNb3ZlKGNvbmZpZy5mcmVlKTtcblxuICAgIC8vIERyYXcgc2F2ZWQgc2hhcGVzXG4gICAgaWYgKGNvbmZpZy5zaGFwZXMpIHtcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3luY19ib2FyZF93aXRoX2dhbWVzdGF0ZShmYWxzZSk7XG4gICAgICAgICAgdGhpcy5jZy5zZXRTaGFwZXMoY29uZmlnLnNoYXBlcyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnUgPSBuZXcgQ2hlc3Nlck1lbnUoY29udGFpbmVyRWwsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRfc3R5bGUoZWw6IEhUTUxFbGVtZW50LCBwaWVjZVN0eWxlOiBzdHJpbmcsIGJvYXJkU3R5bGU6IHN0cmluZykge1xuICAgIGVsLmFkZENsYXNzZXMoW3BpZWNlU3R5bGUsIGAke2JvYXJkU3R5bGV9LWJvYXJkYCwgXCJjaGVzc2VyLWNvbnRhaW5lclwiXSk7XG4gIH1cblxuICBwcml2YXRlIGdldF9zZWN0aW9uX3JhbmdlKCk6IFtFZGl0b3JQb3NpdGlvbiwgRWRpdG9yUG9zaXRpb25dIHtcbiAgICBjb25zdCBzZWN0aW9uSW5mbyA9IHRoaXMuY3R4LmdldFNlY3Rpb25JbmZvKHRoaXMuY29udGFpbmVyRWwpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgbGluZTogc2VjdGlvbkluZm8ubGluZVN0YXJ0ICsgMSxcbiAgICAgICAgY2g6IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsaW5lOiBzZWN0aW9uSW5mby5saW5lRW5kLFxuICAgICAgICBjaDogMCxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0X2NvbmZpZyh2aWV3OiBNYXJrZG93blZpZXcpOiBDaGVzc2VyQ29uZmlnIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBbZnJvbSwgdG9dID0gdGhpcy5nZXRfc2VjdGlvbl9yYW5nZSgpO1xuICAgIGNvbnN0IGNvZGVibG9ja1RleHQgPSB2aWV3LmVkaXRvci5nZXRSYW5nZShmcm9tLCB0byk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBwYXJzZVlhbWwoY29kZWJsb2NrVGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoKCkgPT5cbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcImZhaWxlZCB0byBwYXJzZSBjb2RlYmxvY2sncyB5YW1sIGNvbmZpZ1wiLCBjb2RlYmxvY2tUZXh0KVxuICAgICAgKTtcbiAgICAgIC8vIGZhaWxlZCB0byBwYXJzZS4gc2hvdyBlcnJvci4uLlxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIHdyaXRlX2NvbmZpZyhjb25maWc6IFBhcnRpYWw8Q2hlc3NlckNvbmZpZz4pIHtcbiAgICBkZWJ1ZygoKSA9PiBjb25zb2xlLmRlYnVnKFwid3JpdGluZyBjb25maWcgdG8gbG9jYWxTdG9yYWdlXCIsIGNvbmZpZykpO1xuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgIGlmICghdmlldykge1xuICAgICAgbmV3IE5vdGljZShcIkNoZXNzZXI6IEZhaWxlZCB0byByZXRyaWV2ZSBhY3RpdmUgdmlld1wiKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDaGVzc2VyOiBGYWlsZWQgdG8gcmV0cmlldmUgdmlldyB3aGVuIHdyaXRpbmcgY29uZmlnXCIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBkYXRlZCA9IHN0cmluZ2lmeVlhbWwoe1xuICAgICAgICAuLi50aGlzLmdldF9jb25maWcodmlldyksXG4gICAgICAgIC4uLmNvbmZpZyxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBbZnJvbSwgdG9dID0gdGhpcy5nZXRfc2VjdGlvbl9yYW5nZSgpO1xuICAgICAgdmlldy5lZGl0b3IucmVwbGFjZVJhbmdlKHVwZGF0ZWQsIGZyb20sIHRvKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBmYWlsZWQgdG8gcGFyc2UuIHNob3cgZXJyb3IuLi5cbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmYWlsZWQgdG8gd3JpdGUgY29uZmlnXCIsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZV9tb3ZlKCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHJlYWRfc3RhdGUodGhpcy5pZCk7XG4gICAgd3JpdGVfc3RhdGUodGhpcy5pZCwge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgY3VycmVudE1vdmVJZHg6IHRoaXMuY3VycmVudE1vdmVJZHgsXG4gICAgICBtb3ZlczogdGhpcy5tb3ZlcyxcbiAgICAgIHBnbjogdGhpcy5jaGVzcy5wZ24oKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZV9zaGFwZXMoc2hhcGVzOiBEcmF3U2hhcGVbXSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHJlYWRfc3RhdGUodGhpcy5pZCk7XG4gICAgd3JpdGVfc3RhdGUodGhpcy5pZCwge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgc2hhcGVzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jX2JvYXJkX3dpdGhfZ2FtZXN0YXRlKHNob3VsZFNhdmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5jZy5zZXQoe1xuICAgICAgY2hlY2s6IHRoaXMuY2hlY2soKSxcbiAgICAgIHR1cm5Db2xvcjogdGhpcy5jb2xvcl90dXJuKCksXG4gICAgICBtb3ZhYmxlOiB7XG4gICAgICAgIGZyZWU6IGZhbHNlLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcl90dXJuKCksXG4gICAgICAgIGRlc3RzOiB0aGlzLmRlc3RzKCksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51Py5yZWRyYXdNb3ZlTGlzdCgpO1xuICAgIGlmIChzaG91bGRTYXZlKSB7XG4gICAgICB0aGlzLnNhdmVfbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb2xvcl90dXJuKCk6IENvbG9yIHtcbiAgICByZXR1cm4gdGhpcy5jaGVzcy50dXJuKCkgPT09IFwid1wiID8gXCJ3aGl0ZVwiIDogXCJibGFja1wiO1xuICB9XG5cbiAgcHVibGljIGRlc3RzKCk6IE1hcDxLZXksIEtleVtdPiB7XG4gICAgY29uc3QgZGVzdHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5jaGVzcy5TUVVBUkVTLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGNvbnN0IG1zID0gdGhpcy5jaGVzcy5tb3Zlcyh7IHNxdWFyZTogcywgdmVyYm9zZTogdHJ1ZSB9KTtcbiAgICAgIGlmIChtcy5sZW5ndGgpXG4gICAgICAgIGRlc3RzLnNldChcbiAgICAgICAgICBzLFxuICAgICAgICAgIG1zLm1hcCgobSkgPT4gbS50bylcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVzdHM7XG4gIH1cblxuICBwdWJsaWMgY2hlY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlc3MuaW5fY2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyB1bmRvX21vdmUoKSB7XG4gICAgdGhpcy51cGRhdGVfdHVybl9pZHgodGhpcy5jdXJyZW50TW92ZUlkeCAtIDEpO1xuICB9XG5cbiAgcHVibGljIHJlZG9fbW92ZSgpIHtcbiAgICB0aGlzLnVwZGF0ZV90dXJuX2lkeCh0aGlzLmN1cnJlbnRNb3ZlSWR4ICsgMSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlX3R1cm5faWR4KG1vdmVJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChtb3ZlSWR4IDwgLTEgfHwgbW92ZUlkeCA+PSB0aGlzLm1vdmVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVW5kb2luZyA9IG1vdmVJZHggPCB0aGlzLmN1cnJlbnRNb3ZlSWR4O1xuICAgIGlmIChpc1VuZG9pbmcpIHtcbiAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRNb3ZlSWR4ID4gbW92ZUlkeCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRNb3ZlSWR4LS07XG4gICAgICAgIHRoaXMuY2hlc3MudW5kbygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAodGhpcy5jdXJyZW50TW92ZUlkeCA8IG1vdmVJZHgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50TW92ZUlkeCsrO1xuICAgICAgICBjb25zdCBtb3ZlID0gdGhpcy5tb3Zlc1t0aGlzLmN1cnJlbnRNb3ZlSWR4XTtcbiAgICAgICAgdGhpcy5jaGVzcy5tb3ZlKG1vdmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBsYXN0TW92ZTogW0tleSwgS2V5XSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5jdXJyZW50TW92ZUlkeCA+PSAwKSB7XG4gICAgICBjb25zdCBtb3ZlID0gdGhpcy5tb3Zlc1t0aGlzLmN1cnJlbnRNb3ZlSWR4XTtcbiAgICAgIGxhc3RNb3ZlID0gW21vdmUuZnJvbSwgbW92ZS50b107XG4gICAgfVxuXG4gICAgdGhpcy5jZy5zZXQoe1xuICAgICAgZmVuOiB0aGlzLmNoZXNzLmZlbigpLFxuICAgICAgbGFzdE1vdmUsXG4gICAgfSk7XG4gICAgdGhpcy5zeW5jX2JvYXJkX3dpdGhfZ2FtZXN0YXRlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0RnJlZU1vdmUoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICB0aGlzLmNnLnNldCh7XG4gICAgICAgIGV2ZW50czoge1xuICAgICAgICAgIG1vdmU6IHRoaXMuc2F2ZV9tb3ZlLFxuICAgICAgICB9LFxuICAgICAgICBtb3ZhYmxlOiB7XG4gICAgICAgICAgZnJlZTogdHJ1ZSxcbiAgICAgICAgICBjb2xvcjogXCJib3RoXCIsXG4gICAgICAgICAgZGVzdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNnLnNldCh7XG4gICAgICAgIGV2ZW50czoge1xuICAgICAgICAgIG1vdmU6IChvcmlnOiBhbnksIGRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW92ZSA9IHRoaXMuY2hlc3MubW92ZSh7IGZyb206IG9yaWcsIHRvOiBkZXN0IH0pO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW92ZUlkeCsrO1xuICAgICAgICAgICAgdGhpcy5tb3ZlcyA9IFsuLi50aGlzLm1vdmVzLnNsaWNlKDAsIHRoaXMuY3VycmVudE1vdmVJZHgpLCBtb3ZlXTtcbiAgICAgICAgICAgIHRoaXMuc3luY19ib2FyZF93aXRoX2dhbWVzdGF0ZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3luY19ib2FyZF93aXRoX2dhbWVzdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0dXJuKCkge1xuICAgIHJldHVybiB0aGlzLmNoZXNzLnR1cm4oKTtcbiAgfVxuXG4gIHB1YmxpYyBoaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLm1vdmVzO1xuICB9XG5cbiAgcHVibGljIGZsaXBCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jZy50b2dnbGVPcmllbnRhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGdldEJvYXJkU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2cuc3RhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmVuKCkge1xuICAgIHJldHVybiB0aGlzLmNoZXNzLmZlbigpO1xuICB9XG5cbiAgcHVibGljIGxvYWRGZW4oZmVuOiBzdHJpbmcsIG1vdmVzPzogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBsZXQgbGFzdE1vdmU6IFtLZXksIEtleV0gPSB1bmRlZmluZWQ7XG4gICAgaWYgKG1vdmVzKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNb3ZlSWR4ID0gLTE7XG4gICAgICB0aGlzLm1vdmVzID0gW107XG4gICAgICB0aGlzLmNoZXNzLnJlc2V0KCk7XG5cbiAgICAgIG1vdmVzLmZvckVhY2goKGZ1bGxNb3ZlKSA9PiB7XG4gICAgICAgIGZ1bGxNb3ZlLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChoYWxmTW92ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1vdmUgPSB0aGlzLmNoZXNzLm1vdmUoaGFsZk1vdmUpO1xuICAgICAgICAgIHRoaXMubW92ZXMucHVzaChtb3ZlKTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRNb3ZlSWR4Kys7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRNb3ZlSWR4ID49IDApIHtcbiAgICAgICAgY29uc3QgbW92ZSA9IHRoaXMubW92ZXNbdGhpcy5jdXJyZW50TW92ZUlkeF07XG4gICAgICAgIGxhc3RNb3ZlID0gW21vdmUuZnJvbSwgbW92ZS50b107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlc3MubG9hZChmZW4pO1xuICAgIH1cblxuICAgIHRoaXMuY2cuc2V0KHsgZmVuOiB0aGlzLmNoZXNzLmZlbigpLCBsYXN0TW92ZSB9KTtcbiAgICB0aGlzLnN5bmNfYm9hcmRfd2l0aF9nYW1lc3RhdGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQk9BUkRfU1RZTEVTLCBQSUVDRV9TVFlMRVMgfSBmcm9tIFwiLi9DaGVzc2VyQ29uZmlnXCI7XG5pbXBvcnQgQ2hlc3NlclBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoZXNzZXJTZXR0aW5ncyB7XG4gIG9yaWVudGF0aW9uOiBzdHJpbmc7XG4gIHZpZXdPbmx5OiBib29sZWFuO1xuICBkcmF3YWJsZTogYm9vbGVhbjtcbiAgZnJlZTogYm9vbGVhbjtcbiAgcGllY2VTdHlsZTogc3RyaW5nO1xuICBib2FyZFN0eWxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBDaGVzc2VyU2V0dGluZ3MgPSB7XG4gIG9yaWVudGF0aW9uOiBcIndoaXRlXCIsXG4gIHZpZXdPbmx5OiBmYWxzZSxcbiAgZHJhd2FibGU6IHRydWUsXG4gIGZyZWU6IGZhbHNlLFxuICBwaWVjZVN0eWxlOiBcImNidXJuZXR0XCIsXG4gIGJvYXJkU3R5bGU6IFwiYnJvd25cIixcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGVzc2VyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IENoZXNzZXJQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ2hlc3NlclBsdWdpbikge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiT2JzaWRpYW4gQ2hlc3MgU2V0dGluZ3NcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJQaWVjZSBTdHlsZVwiKVxuICAgICAgLnNldERlc2MoXCJTZXRzIHRoZSBwaWVjZSBzdHlsZS5cIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgbGV0IHN0eWxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBQSUVDRV9TVFlMRVMubWFwKChzdHlsZSkgPT4gKHN0eWxlc1tzdHlsZV0gPSBzdHlsZSkpO1xuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb25zKHN0eWxlcyk7XG5cbiAgICAgICAgZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucGllY2VTdHlsZSkub25DaGFuZ2UoKHBpZWNlU3R5bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5waWVjZVN0eWxlID0gcGllY2VTdHlsZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJCb2FyZCBTdHlsZVwiKVxuICAgICAgLnNldERlc2MoXCJTZXRzIHRoZSBib2FyZCBzdHlsZS5cIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgbGV0IHN0eWxlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgICAgICBCT0FSRF9TVFlMRVMubWFwKChzdHlsZSkgPT4gKHN0eWxlc1tzdHlsZV0gPSBzdHlsZSkpO1xuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb25zKHN0eWxlcyk7XG5cbiAgICAgICAgZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYm9hcmRTdHlsZSkub25DaGFuZ2UoKGJvYXJkU3R5bGUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5ib2FyZFN0eWxlID0gYm9hcmRTdHlsZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJPcmllbnRhdGlvblwiKVxuICAgICAgLnNldERlc2MoXCJTZXRzIHRoZSBkZWZhdWx0IGJvYXJkIG9yaWVudGF0aW9uLlwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJ3aGl0ZVwiLCBcIldoaXRlXCIpO1xuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJibGFja1wiLCBcIkJsYWNrXCIpO1xuXG4gICAgICAgIGRyb3Bkb3duLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9yaWVudGF0aW9uKS5vbkNoYW5nZSgob3JpZW50YXRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkRyYXdhYmxlXCIpXG4gICAgICAuc2V0RGVzYyhcIkNvbnRyb2xzIHRoZSBhYmlsaXR5IHRvIGRyYXcgYW5ub3RhdGlvbnMgKGFycm93cywgY2lyY2xlcykgb24gdGhlIGJvYXJkLlwiKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kcmF3YWJsZSkub25DaGFuZ2UoKGRyYXdhYmxlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZHJhd2FibGUgPSBkcmF3YWJsZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJWaWV3LW9ubHlcIilcbiAgICAgIC5zZXREZXNjKFwiSWYgZW5hYmxlZCwgZGlzcGxheXMgYSBzdGF0aWMgY2hlc3MgYm9hcmQgKG5vIG1vdmVzLCBhbm5vdGF0aW9ucywgLi4uKS5cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xuICAgICAgICB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mudmlld09ubHkpLm9uQ2hhbmdlKCh2aWV3T25seSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnZpZXdPbmx5ID0gdmlld09ubHk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiRnJlZVwiKVxuICAgICAgLnNldERlc2MoXCJJZiBlbmFibGVkLCBkaXNhYmxlcyB0aGUgY2hlc3MgbG9naWMsIGFsbCBtb3ZlcyBhcmUgdmFsaWQuXCIpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZyZWUpLm9uQ2hhbmdlKChmcmVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZnJlZSA9IGZyZWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1hcmtkb3duVmlldywgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IGRyYXdfY2hlc3Nib2FyZCB9IGZyb20gXCIuL0NoZXNzZXJcIjtcclxuaW1wb3J0IHsgQ2hlc3NlclNldHRpbmdzLCBDaGVzc2VyU2V0dGluZ1RhYiwgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gXCIuL0NoZXNzZXJTZXR0aW5nc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlc3NlclBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IENoZXNzZXJTZXR0aW5ncztcclxuXHJcbiAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgQ2hlc3NlclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuICAgIHRoaXMucmVnaXN0ZXJNYXJrZG93bkNvZGVCbG9ja1Byb2Nlc3NvcihcclxuICAgICAgXCJjaGVzc2VyXCIsIC8vIGtlZXAgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5L2JyYW5kaW5nXHJcbiAgICAgIGRyYXdfY2hlc3Nib2FyZCh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncylcclxuICAgICk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyTWFya2Rvd25Db2RlQmxvY2tQcm9jZXNzb3IoXHJcbiAgICAgIFwiY2hlc3NcIixcclxuICAgICAgZHJhd19jaGVzc2JvYXJkKHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImNnLnJhbmtzIiwiY2cuZmlsZXMiLCJ1dGlsLmtleTJwb3MiLCJ1dGlsLmFsbFBvcyIsInV0aWwucG9zMmtleSIsImZlblJlYWQiLCJyZW5kZXIiLCJ1dGlsLmRpc3RhbmNlU3EiLCJ1dGlsLmFsbEtleXMiLCJ1dGlsLnNhbWVQaWVjZSIsInN0YXJ0IiwibW92ZSIsImVuZCIsImNhbmNlbCIsInV0aWwuZXZlbnRQb3NpdGlvbiIsImJvYXJkLmdldEtleUF0RG9tUG9zIiwiYm9hcmQud2hpdGVQb3YiLCJkcmF3Q2xlYXIiLCJib2FyZC5jYW5Nb3ZlIiwiYm9hcmQuc2VsZWN0U3F1YXJlIiwiYm9hcmQuaXNEcmFnZ2FibGUiLCJ1dGlsLnRyYW5zbGF0ZSIsInV0aWwucG9zVG9UcmFuc2xhdGUiLCJ1dGlsLnNldFZpc2libGUiLCJib2FyZC51bnNldFByZW1vdmUiLCJib2FyZC51bnNldFByZWRyb3AiLCJ1dGlsLmNvbXB1dGVTcXVhcmVDZW50ZXIiLCJib2FyZC5kcm9wTmV3UGllY2UiLCJib2FyZC51c2VyTW92ZSIsImJvYXJkLmNhbGxVc2VyRnVuY3Rpb24iLCJib2FyZC51bnNlbGVjdCIsInRvZ2dsZU9yaWVudGF0aW9uIiwiYm9hcmQudG9nZ2xlT3JpZW50YXRpb24iLCJmZW5Xcml0ZSIsImJvYXJkLnNldFBpZWNlcyIsImJvYXJkLmJhc2VNb3ZlIiwiYm9hcmQuYmFzZU5ld1BpZWNlIiwiYm9hcmQucGxheVByZW1vdmUiLCJib2FyZC5wbGF5UHJlZHJvcCIsImJvYXJkLmNhbmNlbE1vdmUiLCJkcmFnQ2FuY2VsIiwiYm9hcmQuc3RvcCIsImZlbi5yZWFkIiwiZmVuLmluaXRpYWwiLCJyZW5kZXJTaGFwZSIsImNyZWF0ZVNWRyIsImRyYWcubW92ZSIsImRyYXcubW92ZSIsImRyYWcuZW5kIiwiZHJhdy5lbmQiLCJkcmFnLmNhbmNlbCIsImRyYXcuY2FuY2VsIiwiZHJhdy5zdGFydCIsImRyYWcuc3RhcnQiLCJwb3NUb1RyYW5zbGF0ZSIsInBvc1RvVHJhbnNsYXRlRnJvbUJvdW5kcyIsInJlbmRlclJlc2l6ZWQiLCJ1dGlsLm1lbW8iLCJhdXRvUGllY2VzLnJlbmRlciIsInN2Zy5yZW5kZXJTdmciLCJhdXRvUGllY2VzLnJlbmRlclJlc2l6ZWQiLCJldmVudHMuYmluZEJvYXJkIiwiZXZlbnRzLmJpbmREb2N1bWVudCIsInBhcnNlWWFtbCIsInN0YXJ0aW5nUG9zaXRvbnMiLCJTZXR0aW5nIiwic2V0SWNvbiIsIk1hcmtkb3duUmVuZGVyQ2hpbGQiLCJDaGVzcyIsIk5vdGljZSIsIk1hcmtkb3duVmlldyIsInN0cmluZ2lmeVlhbWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FB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QyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsSUFBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLElBQUksT0FBTyxHQUFHO0FBQ2hCLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNyRCxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDckQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyRCxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDckQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyRCxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDckQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyRCxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDckQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNyRCxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDckQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDbEQsR0FBRyxDQUFDO0FBQ0o7QUFDQTtBQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDYixLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDbEUsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDbEUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDL0QsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUU7QUFDckQ7QUFDQSxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ2QsSUFBSSxNQUFNLEVBQUUsR0FBRztBQUNmLElBQUksT0FBTyxFQUFFLEdBQUc7QUFDaEIsSUFBSSxRQUFRLEVBQUUsR0FBRztBQUNqQixJQUFJLFVBQVUsRUFBRSxHQUFHO0FBQ25CLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsSUFBSSxZQUFZLEVBQUUsR0FBRztBQUNyQixJQUFJLFlBQVksRUFBRSxHQUFHO0FBQ3JCLElBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDYixJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQ2IsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUNkLElBQUksUUFBUSxFQUFFLENBQUM7QUFDZixJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQ2pCLElBQUksU0FBUyxFQUFFLEVBQUU7QUFDakIsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNwQixJQUFJLFlBQVksRUFBRSxFQUFFO0FBQ3BCLElBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBQztBQUNoQixFQUFFLElBQUksTUFBTSxHQUFHLEVBQUM7QUFLaEIsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFDO0FBQ2hCLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBQztBQUNoQjtBQUNBO0FBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRztBQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7QUFDMUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0FBQzFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtBQUMxRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7QUFDMUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0FBQzFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtBQUMxRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDMUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHO0FBQzFFLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNkLElBQUksQ0FBQyxFQUFFO0FBQ1AsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3JELE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNyRCxLQUFLO0FBQ0wsSUFBSSxDQUFDLEVBQUU7QUFDUCxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDckQsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3JELEtBQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBQztBQUM1QixFQUFFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFFO0FBQ3BDLEVBQUUsSUFBSSxJQUFJLEdBQUcsTUFBSztBQUNsQixFQUFFLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFO0FBQy9CLEVBQUUsSUFBSSxTQUFTLEdBQUcsTUFBSztBQUN2QixFQUFFLElBQUksVUFBVSxHQUFHLEVBQUM7QUFDcEIsRUFBRSxJQUFJLFdBQVcsR0FBRyxFQUFDO0FBQ3JCLEVBQUUsSUFBSSxPQUFPLEdBQUcsR0FBRTtBQUNsQixFQUFFLElBQUksTUFBTSxHQUFHLEdBQUU7QUFDakIsRUFBRSxJQUFJLFFBQVEsR0FBRyxHQUFFO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztBQUMxQixHQUFHLE1BQU07QUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUM7QUFDYixHQUFHO0FBQ0g7QUFDQSxFQUFFLFNBQVMsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUMvQixJQUFJLElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxFQUFFO0FBQzdDLE1BQU0sWUFBWSxHQUFHLE1BQUs7QUFDMUIsS0FBSztBQUNMO0FBQ0EsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFDO0FBQzFCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFFO0FBQ2xDLElBQUksSUFBSSxHQUFHLE1BQUs7QUFDaEIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUU7QUFDN0IsSUFBSSxTQUFTLEdBQUcsTUFBSztBQUNyQixJQUFJLFVBQVUsR0FBRyxFQUFDO0FBQ2xCLElBQUksV0FBVyxHQUFHLEVBQUM7QUFDbkIsSUFBSSxPQUFPLEdBQUcsR0FBRTtBQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxHQUFHLEdBQUU7QUFDbEMsSUFBSSxRQUFRLEdBQUcsR0FBRTtBQUNqQixJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBQztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLFNBQVMsY0FBYyxHQUFHO0FBQzVCLElBQUksSUFBSSxnQkFBZ0IsR0FBRyxHQUFFO0FBQzdCLElBQUksSUFBSSxnQkFBZ0IsR0FBRyxHQUFFO0FBQzdCLElBQUksSUFBSSxZQUFZLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7QUFDM0IsUUFBUSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFDO0FBQzdDLE9BQU87QUFDUCxNQUFLO0FBQ0wsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLE1BQU0sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDO0FBQ3hDLEtBQUs7QUFDTCxJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBQztBQUNoQyxJQUFJLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN4QyxNQUFNLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFBQztBQUN2QyxNQUFNLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBQztBQUNsQyxLQUFLO0FBQ0wsSUFBSSxRQUFRLEdBQUcsaUJBQWdCO0FBQy9CLEdBQUc7QUFDSDtBQUNBLEVBQUUsU0FBUyxLQUFLLEdBQUc7QUFDbkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7QUFDMUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFO0FBQ25DLElBQUksSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7QUFDN0MsTUFBTSxZQUFZLEdBQUcsTUFBSztBQUMxQixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO0FBQ2pDLElBQUksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBQztBQUM1QixJQUFJLElBQUksTUFBTSxHQUFHLEVBQUM7QUFDbEI7QUFDQSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ2xDLE1BQU0sT0FBTyxLQUFLO0FBQ2xCLEtBQUs7QUFDTDtBQUNBLElBQUksS0FBSyxDQUFDLFlBQVksRUFBQztBQUN2QjtBQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUMsTUFBTSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQztBQUNwQztBQUNBLE1BQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQ3pCLFFBQVEsTUFBTSxJQUFJLEVBQUM7QUFDbkIsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xDLFFBQVEsTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDO0FBQ3JDLE9BQU8sTUFBTTtBQUNiLFFBQVEsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsTUFBSztBQUMvQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBQztBQUMzRSxRQUFRLE1BQU0sR0FBRTtBQUNoQixPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBQztBQUNwQjtBQUNBLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3JDLE1BQU0sUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBWTtBQUNyQyxLQUFLO0FBQ0wsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDckMsTUFBTSxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFZO0FBQ3JDLEtBQUs7QUFDTCxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNyQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQVk7QUFDckMsS0FBSztBQUNMLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3JDLE1BQU0sUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBWTtBQUNyQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQzlELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDO0FBQ3hDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDO0FBQ3pDO0FBQ0EsSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUM7QUFDaEM7QUFDQSxJQUFJLE9BQU8sSUFBSTtBQUNmLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUM3QixJQUFJLElBQUksTUFBTSxHQUFHO0FBQ2pCLE1BQU0sQ0FBQyxFQUFFLFlBQVk7QUFDckIsTUFBTSxDQUFDLEVBQUUscURBQXFEO0FBQzlELE1BQU0sQ0FBQyxFQUFFLHFEQUFxRDtBQUM5RCxNQUFNLENBQUMsRUFBRSwrREFBK0Q7QUFDeEUsTUFBTSxDQUFDLEVBQUUsMkNBQTJDO0FBQ3BELE1BQU0sQ0FBQyxFQUFFLCtDQUErQztBQUN4RCxNQUFNLENBQUMsRUFBRSxzQ0FBc0M7QUFDL0MsTUFBTSxDQUFDLEVBQUUsb0VBQW9FO0FBQzdFLE1BQU0sQ0FBQyxFQUFFLCtEQUErRDtBQUN4RSxNQUFNLENBQUMsRUFBRSx5REFBeUQ7QUFDbEUsTUFBTSxFQUFFLEVBQUUseURBQXlEO0FBQ25FLE1BQU0sRUFBRSxFQUFFLDJCQUEyQjtBQUNyQyxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7QUFDakMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzdCLE1BQU0sT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hFLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMxRCxNQUFNLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNoRSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekQsTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEUsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakQsTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEUsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEQsTUFBTSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEUsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLE1BQU0sT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hFLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxJ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LElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtBQUNuQyxVQUFVLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQztBQUN4RDtBQUNBO0FBQ0EsVUFBVSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUM5QyxVQUFVLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQ3BFLFlBQVksUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDO0FBQzVELFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsVUFBVSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUM5QyxVQUFVLElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxRQUFRO0FBQ3JDO0FBQ0EsVUFBVSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7QUFDckUsWUFBWSxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUM7QUFDM0QsV0FBVyxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUMzQyxZQUFZLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFB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QUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1RCxRQUFRO0FBQ1IsVUFBVSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQzNDLFVBQVUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0FBQzFDLFVBQVU7QUFDVixVQUFVLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSTtBQUMzQyxVQUFVLEtBQUs7QUFDZixTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN4QixNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUQsUUFBUTtBQUNSLFVBQVUsSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUMzQyxVQUFVLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUM5QyxVQUFVO0FBQ1YsVUFBVSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUk7QUFDL0MsVUFBVSxLQUFLO0FBQ2YsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVB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QVMsV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUNsQyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUM7QUFDL0IsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7QUFDakUsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDO0FBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztBQUNwQztBQUNBLElBQUksSUFBSSxLQUFLLEdBQUcsR0FBRTtBQUNsQjtBQUNBLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDM0IsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ25DLFFBQVEsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUM7QUFDNUIsT0FBTztBQUNQLEtBQUs7QUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBSztBQUN0QjtBQUNBLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUU7QUFDdEIsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLFlBQVksS0FBSyxHQUFHLEVBQUUsR0FBRyxHQUFFO0FBQzdDO0FBQ0EsSUFBSSxLQUFLLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUM5QixNQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO0FBQ3hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDN0MsT0FBTyxNQUFNO0FBQ2IsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUN0QyxP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Q0FBQyxLQUFLLENBQUM7QUFDM0UsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkssTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLO0FBQ3RDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBQ0ssTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsS0FBSztBQUN6RCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFDO0FBQ0ssTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLO0FBQ3JDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDbkQsQ0FBQyxDQUFDO0FBQ0ssTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEtBQUs7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QyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNwRSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUNwRSxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxXQUFXLEdBQUc7QUFDdkIsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDbkMsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsS0FBSyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqRSxDQUFDO0FBQ0QsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUNqQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3BDLENBQUM7QUFDRCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQy9CLElBQUksTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0QsSUFBSSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxL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
