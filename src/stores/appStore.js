import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { filterFn } from "@/utils/filter";

export const useAppStore = defineStore("appStore", () => {
  const tableHead = [
    {
      text: "id",
      className: "basis-2/25 text-center truncate p-2 my-0.5",
    },
    {
      text: "albumId",
      className: "basis-1/7 text-center truncate p-2 my-0.5",
    },
    {
      text: "title",
      className: "basis-25/100 text-center truncate p-2 my-0.5",
    },
    {
      text: "url",
      className: "basis-25/101 text-center truncate p-2 my-0.5",
    },
    {
      text: "thumbnailUrl",
      className: "basis-27/100 text-center truncate p-2 my-0.5",
    },
  ];
  const pictures = ref([]);
  const sortedBy = ref("");
  const filter = ref("id");
  const shownPictures = ref(30);
  const albums = ref("");
  const seachAlbums = ref([]);
  const loadedAlbum = ref(seachAlbums.value[seachAlbums.value.length - 1] || 0);
  const picturesLength = computed(() => pictures.value.length);
  const loadedPictures = computed(() =>
    filterFn(sortedBy.value, filter.value, pictures.value).slice(
      0,
      shownPictures.value
    )
  );

  const filterHandler = (newFilter) => {
    filter.value = newFilter;
    if (sortedBy.value !== newFilter + "-increase") {
      sortedBy.value = newFilter + "-increase";
    } else {
      sortedBy.value = newFilter + "-decrease";
    }
  };

  const addAlbums = (newAlbums) => {
    seachAlbums.value.push(...newAlbums);
  };
  const clearSearch = () => {
    seachAlbums.value = [];
  };
  const handlerSearch = () => {
    clearSearch();
    const res = albums.value
      .split(" ")
      .map((item) => parseInt(item))
      .filter((item) => !isNaN(item) && item > 0 && item < 101);
    addAlbums(res);
    loadAlbums();
    clearSearch();
    shownPictures.value = 30;
    albums.value = "";
  };
  const loadAlbums = async () => {
    const albums = new URL("https://jsonplaceholder.typicode.com/photos");

    seachAlbums.value.forEach((item) =>
      albums.searchParams.append("albumId", item)
    );

    loadedAlbum.value = seachAlbums.value[seachAlbums.value.length - 1];

    try {
      const response = await fetch(albums.href);
      const data = await response.json();
      pictures.value = [];
      pictures.value.push(...data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPictures = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${
          loadedAlbum.value + 1
        }`
      );
      const data = await response.json();
      pictures.value.push(...data);
      loadedAlbum.value++;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pictures,
    tableHead,
    loadPictures,
    picturesLength,
    addAlbums,
    clearSearch,
    loadAlbums,
    shownPictures,
    loadedPictures,
    filterHandler,
    albums,
    handlerSearch,
  };
});
