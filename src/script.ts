interface Episode {
    name: string;
    air_date: string;
    episode: string;
    url: string;
    created: string;
    characters: string[];
}

(async function () {
    async function fetchEpisodeFromApi() {
        try {
            const response = await fetch("https://rickandmortyapi.com/api/episode");
            const responseData = await response.json();
            const episodesData: Episode[] = responseData.results;

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
                ul?.appendChild(li);
            });

        } catch (error) {
            console.error(error);
        }
    }
    fetchEpisodeFromApi();
})();