interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    url: string;
    created: string;
    characters: string[];
    status: string;
};

interface character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    }
    location: {
        name: string;
        url: string;
    }
    image: string;
    episode: string[];
    url: string;
    created: string;
}

(async function getEpisodesFromApi(): Promise<void> {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const responseData = await response.json();
        const episodeData: Episode[] = responseData.results;

        initTable(episodeData);
        initTable2(episodeData);
        listOfMoreThen12(episodeData);

    } catch (error) {
        console.error(error);
    }
})();

function initTable(episodeData: Episode[]): void {
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

function initTable2(episodeData: Episode[] = []): void {
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

function listOfMoreThen12(episodeData: Episode[] = []): void {
    const MoreThen12 = episodeData.filter(episode => episode.characters.length > 12);
    const ul = document.querySelector(`#list-of-characters`);
    MoreThen12.forEach(episode => {
        const li = document.createElement(`li`);
        li.classList.add(`list`);
        li.innerHTML = `<Strong>Name:</strong> ${episode.name} <br> <strong>Characters:</strong> ${episode.characters.join(" ")}`;
        ul?.appendChild(li);
    });
}

(async function getCharactersFromApi(): Promise<void> {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const responseData = await response.json();
        const characterData: character[] = responseData.results;

        displayListByClickOnCheckBox(characterData);

    } catch (error) {
        console.error(error);
    }
})();

function displayListByClickOnCheckBox(characterData: character[] = []): void {
    const ul = document.querySelector(`#listWithCheckBox`);
    const checkBox = document.querySelector<HTMLInputElement>(`#checkBox`);

    characterData.forEach(character => {
        const li = document.createElement(`li`);
        li.classList.add(`list`);
        li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
        ul?.appendChild(li);
    });

    checkBox?.addEventListener(`click`, () => {
        if (checkBox.checked) {
            if (ul) {
                ul.innerHTML = ``;
            }
            characterData.forEach(character => {
                if (character.status === "Alive") {
                    const li = document.createElement(`li`);
                    li.classList.add(`list`);
                    li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
                    ul?.appendChild(li);
                }
            })
        } else {
            if(ul) {
                ul.innerHTML = ``;
            }
            characterData.forEach(character => {
                const li = document.createElement(`li`);
                li.classList.add(`list`);
                li.innerHTML = `<strong>Name:</strong> ${character.name}, <strong>Status:</strong> ${character.status}`;
                ul?.appendChild(li);
            })
        }
    });
}