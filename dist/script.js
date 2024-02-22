"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
(function getEpisodesFromApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://rickandmortyapi.com/api/episode");
            const responseData = yield response.json();
            const episodeData = responseData.results;
            initTable(episodeData);
            initTable2(episodeData);
            listOfMoreThen12(episodeData);
        }
        catch (error) {
            console.error(error);
        }
    });
})();
function initTable(episodeData) {
    $(`#myTable`).DataTable({
        data: episodeData,
        columns: [
            { data: "name" },
            { data: "air_date" },
            { data: "episode" },
            { data: "url" },
            { data: "created" },
        ]
    });
}
function initTable2(episodeData = []) {
    const MoreThen12 = episodeData.filter(episode => episode.characters.length > 12);
    $(`#moreThen`).DataTable({
        data: MoreThen12,
        columns: [
            { data: "name" },
            { data: "air_date" },
            { data: "episode" },
            { data: "url" },
            { data: "created" },
        ]
    });
}
function listOfMoreThen12(episodeData = []) {
    const MoreThen12 = episodeData.filter(episode => episode.characters.length > 12);
    const ul = document.querySelector(`#list-of-characters`);
    MoreThen12.forEach(episode => {
        const li = document.createElement(`li`);
        li.classList.add(`list`);
        li.innerHTML = `<Strong>Name:</strong> ${episode.name} <br> <strong>Characters:</strong> ${episode.characters.join(" ")}`;
        ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
    });
}
(function getCharactersFromApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://rickandmortyapi.com/api/character");
            const responseData = yield response.json();
            const characterData = responseData.results;
            displayListByClickOnCheckBox(characterData);
        }
        catch (error) {
            console.error(error);
        }
    });
})();
function displayListByClickOnCheckBox(characterData = []) {
    const ul = document.querySelector(`#listWithCheckBox`);
    const checkBox = document.querySelector(`#checkBox`);
    characterData.forEach(character => {
        const li = document.createElement(`li`);
        li.classList.add(`list`);
        li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
        ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
    });
    checkBox === null || checkBox === void 0 ? void 0 : checkBox.addEventListener(`click`, () => {
        if (checkBox.checked) {
            if (ul) {
                ul.innerHTML = ``;
            }
            characterData.forEach(character => {
                if (character.status === "Alive") {
                    const li = document.createElement(`li`);
                    li.classList.add(`list`);
                    li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
                    ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
                }
            });
        }
        else {
            if (ul) {
                ul.innerHTML = ``;
            }
            characterData.forEach(character => {
                const li = document.createElement(`li`);
                li.classList.add(`list`);
                li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
                ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
            });
        }
    });
}
