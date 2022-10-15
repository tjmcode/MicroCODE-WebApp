// #region  H E A D E R
// <copyright file="account.model.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common User Model
 *      Module:   Modules (./account.model.js)
 *      Project:  MicroCODE 3-Tier MERN App 'Bad Bank'
 *      Customer: Internal + MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     October 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the Bad Bank Account Model.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1.  MIT xPRO MERN Examples
 *          https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2.  MongoDB Schema Design Best Practices
 *          https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/
 *
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:      Description:
 *
 *  03-Oct-2022   TJM-MCODE  {0001}     New module for common reusable MERN Template 'AppName'.
 *  14-Oct-2022   TJM-MCODE  {0002}     Added Roles for controlling access to ALL DATA.
 *
 *
 */
"use strict";

const mongoose = require('mongoose');

// include our common MicroCODE Server Library
var mcode = require(`../mcodeServer.js`);

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

const transactionSchema = new mongoose.Schema(
    {
        type: {
            enum: ['DEPOSIT', 'WITHDRAW', 'BALANCE'],
        },
        amount: {
            type: String,
        },
        balance: {
            type: String,
        },
        timestamp: {
            type: Number,
        }
    });

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        balance: {
            type: Number,
        },
        role: {
            enum: ['BANKER', 'CUSTOMER', 'AUDITOR'],
        },
        created: {
            type: String,
        },
        transaction: {
            type: [transactionSchema],
        }
    });

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * @function accountRecord() -- Create a User Account record.
 *
 * @param {string} username selected by the user.
 * @param {string} email email address supplied by the user.
 * @param {string} password set by the user.
 * @param {string} role what type of account.
 * @param {number} deposit initial deposit, or $0.00.
 * @returns {object} newly created account object with its initial transaction.
 */
var accountRecord = function (username, email, password, role, deposit)
{
    let account =
    {
        username: username,
        email: email,
        password: password,
        role: role,
        balance: parseFloat(deposit),
        created: mcode.timeStamp(),
        transactions: []
    };

    // keep in pennies
    account.balance = mcode.roundToCents(account.balance);

    // make initial depsoit transaction... (optional)
    account.transactions.push(transactionRecord("DEPOSIT", deposit, account.balance));

    return account;
};

/**
 * @function transactionRecord() -- Create an Account Transaction object.
 *
 * @param {string} type One of: DEPOSIT, WITHDRAW, BALANCE, CLOSE.
 * @param {number} amount amount of money involved in this transaction.
 * @param {number} balance resulting balance after the transaction executed.
 * @returns {object} newly created transaction object.
 */
var transactionRecord = function (type, amount, balance)
{
    let transaction =
    {
        type: type,
        amount: amount,
        balance: balance,
        timeStamp: mcode.timeStamp()
    };

    return transaction;
};

// #endregion

// #region  M E T H O D - E X P O R T S

const Account = mongoose.model('Account', accountSchema);

module.exports = {Account, accountRecord, transactionRecord};

// #endregion

// #endregion
// #endregion