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
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        function fetchEpisodeFromApi() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch("https://rickandmortyapi.com/api/episode");
                    const responseData = yield response.json();
                    const episodesData = responseData.results;
                    $(`#myTable`).DataTable({
                        data: episodesData,
                        columns: [
                            { data: "name" },
                            { data: "air_date" },
                            { data: "episode" },
                            { data: "url" },
                            { data: "created" },
                        ]
                    });
                    const filterdEpisode = episodesData.filter(character => character.characters.length > 12);
                    $(`#moreThen`).DataTable({
                        data: filterdEpisode,
                        columns: [
                            { data: "name" },
                            { data: "air_date" },
                            { data: "episode" },
                            { data: "url" },
                            { data: "created" },
                        ]
                    });
                    const ul = document.querySelector(`#list-of-characters`);
                    filterdEpisode.forEach(episode => {
                        const li = document.createElement(`li`);
                        li.classList.add(`list`);
                        li.innerHTML = `<strong>Name:</strong> ${episode.name},<br> <strong>Characters:</strong> ${episode.characters.join(" , ")}`;
                        ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
                    });
                }
                catch (error) {
                    console.error(error);
                }
            });
        }
        fetchEpisodeFromApi();
    });
})();
