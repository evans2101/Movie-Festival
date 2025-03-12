import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import HomePage from "@/pages/HomePage.vue";
import MovieCard from "@/components/MovieCard.vue";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import MovieDetail from "@/pages/MovieDetail.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/movie/:id", component: MovieDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

vi.mock("axios");

describe("Homepage.vue", () => {
  let wrapper;

  const mockMovies = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description 1",
      artists: ["Artist 1"],
      genres: ["Action"],
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description 2",
      artists: ["Artist 2"],
      genres: ["Comedy"],
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description 3",
      artists: ["Artist 3"],
      genres: ["Drama"],
    },
    {
      id: 4,
      title: "Movie 4",
      description: "Description 4",
      artists: ["Artist 4"],
      genres: ["Horror"],
    },
    {
      id: 5,
      title: "Movie 5",
      description: "Description 5",
      artists: ["Artist 5"],
      genres: ["Romance"],
    },
    {
      id: 6,
      title: "Movie 6",
      description: "Description 6",
      artists: ["Artist 6"],
      genres: ["Action"],
    },
    {
      id: 7,
      title: "Movie 7",
      description: "Description 7",
      artists: ["Artist 7"],
      genres: ["Comedy"],
    },
    {
      id: 8,
      title: "Movie 8",
      description: "Description 8",
      artists: ["Artist 8"],
      genres: ["Drama"],
    },
    {
      id: 9,
      title: "Movie 9",
      description: "Description 9",
      artists: ["Artist 9"],
      genres: ["Horror"],
    },
    {
      id: 10,
      title: "Movie 10",
      description: "Description 10",
      artists: ["Artist 10"],
      genres: ["Romance"],
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockMovies });

    wrapper = mount(HomePage, {
      global: {
        plugins: [router],
      },
    });
  });

  it("renders movie cards based on the movie list", async () => {
    await wrapper.vm.$nextTick();
    const movieCards = wrapper.findAllComponents(MovieCard);
    expect(movieCards.length).toBe(8);
  });

  it("searches movies correctly", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.setData({ search: "Action" });
    await wrapper.vm.$nextTick();

    const movieCards = wrapper.findAllComponents(MovieCard);
    expect(movieCards.length).toBe(2);
    expect(movieCards.at(0).props().movie.title).toBe("Movie 1");
    expect(movieCards.at(1).props().movie.title).toBe("Movie 6");
  });

  it("handles pagination correctly (next page)", async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(1);

    const nextButton = wrapper.find("button.page-button:nth-of-type(2)");
    await nextButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentPage).toBe(2);

    const movieCards = wrapper.findAllComponents(MovieCard);
    expect(movieCards.length).toBe(2);
  });

  it("disables the previous button on the first page", async () => {
    await wrapper.vm.$nextTick();
    const prevButton = wrapper.find("button.page-button:nth-of-type(1)");
    expect(prevButton.element.disabled).toBe(true);
  });

  it("handles pagination correctly (previous page)", async () => {
    await wrapper.setData({ currentPage: 2 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentPage).toBe(2);

    const prevButton = wrapper.find("button.page-button:nth-of-type(1)");
    await prevButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentPage).toBe(1);

    const movieCards = wrapper.findAllComponents(MovieCard);
    expect(movieCards.length).toBe(8);
  });

  it("disables the next button on the last page", async () => {
    await wrapper.setData({ currentPage: 2 });
    await wrapper.vm.$nextTick();
    const nextButton = wrapper.find("button.page-button:nth-of-type(2)");
    expect(nextButton.element.disabled).toBe(true);
  });
});
