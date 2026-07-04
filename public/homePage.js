"use strict";
/*const { response } = require("express")

ApiConnector

if (id exists) {
    transfer money
} else {
    error
}*/
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
});
const ratesBoard = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
getCurrencyRates();
setInterval(getCurrencyRates, 60000);
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney({
        currency,
        amount
    }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Успешно");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney({
        fromCurrency,
        targetCurrency,
        fromAmount
    }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Успешно");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney({
        to,
        currency,
        amount
    }, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Успешно");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
const favoritesWidget = new FavoritesWidget();

function refreshFavories() {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
}
refreshFavories();
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites({
        id,
        name
    }, response => {
        if (response.success) {
            refreshFavories();
            favoritesWidget.setMessage(true, "Успешное добавление");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};
favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            refreshFavories();
            favoritesWidget.setMessage(true, "Успешное удаление")
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};