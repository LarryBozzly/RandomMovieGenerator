import React from "react";
import "./App.css";
import YouTube from "react-youtube";
import text from "./movielist/movielist.js";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      page: "",
      header: "",
      overview: "",
      poster: "",
      vote_average: "",
      release_date: "",
      genre_list: "",
      movie_id: "",
      trailer: "",
      isButtonEnabled: true,
      filterList: [],
      filterList_Id: [],
      filterhide: "filter-container-small",
      valueSlider: 0,
      isLoading: false,
      banList: [""],
    };
    this.getfromDB = this.getfromDB.bind(this);
    this.getRandomPage = this.getRandomPage.bind(this);
    this.returnTimer = this.returnTimer.bind(this);
  }
  reversegetGenre(filterList) {
    let genre_list_var = [];
    if (filterList.includes("Action")) {
      genre_list_var.push(28);
    }
    if (filterList.includes("Adventure")) {
      genre_list_var.push(12);
    }
    if (filterList.includes("Animation")) {
      genre_list_var.push(16);
    }
    if (filterList.includes("Comedy")) {
      genre_list_var.push(35);
    }
    if (filterList.includes("Crime")) {
      genre_list_var.push(80);
    }
    if (filterList.includes("Documentary")) {
      genre_list_var.push(99);
    }
    if (filterList.includes("Drama")) {
      genre_list_var.push(18);
    }
    if (filterList.includes("Family")) {
      genre_list_var.push(10751);
    }
    if (filterList.includes("Fantasy")) {
      genre_list_var.push(14);
    }
    if (filterList.includes("History")) {
      genre_list_var.push(36);
    }
    if (filterList.includes("Horror")) {
      genre_list_var.push(27);
    }
    if (filterList.includes("Music")) {
      genre_list_var.push(10402);
    }
    if (filterList.includes("Mystery")) {
      genre_list_var.push(9648);
    }
    if (filterList.includes("Romance")) {
      genre_list_var.push(10749);
    }
    if (filterList.includes("Science Fiction")) {
      genre_list_var.push(878);
    }
    if (filterList.includes("TV Movie")) {
      genre_list_var.push(10770);
    }
    if (filterList.includes("Thriller")) {
      genre_list_var.push(53);
    }
    if (filterList.includes("War")) {
      genre_list_var.push(10752);
    }
    if (filterList.includes("Western")) {
      genre_list_var.push(37);
    }
    this.setState({ filterList_Id: genre_list_var });
  }
  getGenre(genre_list) {
    let genre_list_var = [];
    if (genre_list.includes(28)) {
      genre_list_var.push("Action");
    }
    if (genre_list.includes(12)) {
      genre_list_var.push("Adventure");
    }
    if (genre_list.includes(16)) {
      genre_list_var.push("Animation");
    }
    if (genre_list.includes(35)) {
      genre_list_var.push("Comedy");
    }
    if (genre_list.includes(80)) {
      genre_list_var.push("Crime");
    }
    if (genre_list.includes(99)) {
      genre_list_var.push("Documentary");
    }
    if (genre_list.includes(18)) {
      genre_list_var.push("Drama");
    }
    if (genre_list.includes(10751)) {
      genre_list_var.push("Family");
    }
    if (genre_list.includes(14)) {
      genre_list_var.push("Fantasy");
    }
    if (genre_list.includes(36)) {
      genre_list_var.push("History");
    }
    if (genre_list.includes(27)) {
      genre_list_var.push("Horror");
    }
    if (genre_list.includes(10402)) {
      genre_list_var.push("Music");
    }
    if (genre_list.includes(9648)) {
      genre_list_var.push("Mystery");
    }
    if (genre_list.includes(10749)) {
      genre_list_var.push("Romance");
    }
    if (genre_list.includes(878)) {
      genre_list_var.push("Science Fiction");
    }
    if (genre_list.includes(10770)) {
      genre_list_var.push("TV Movie");
    }
    if (genre_list.includes(53)) {
      genre_list_var.push("Thriller");
    }
    if (genre_list.includes(10752)) {
      genre_list_var.push("War");
    }
    if (genre_list.includes(37)) {
      genre_list_var.push("Western");
    }

    for (let i = 0; i < genre_list_var.length; i++) {
      if (genre_list_var.length > 1 && i !== genre_list_var.length - 1) {
        genre_list_var[i] = genre_list_var[i] + ",";
      }
    }
    this.setState({ genre_list: genre_list_var });
  }
  addtoFilterList(e) {
    if (this.state.filterList.includes(e.innerText)) {
      for (let i = 0; i < this.state.filterList.length; i++) {
        if (e.innerText === this.state.filterList[i]) {
          e.className = "Filter";
          this.state.filterList.splice(i, 1);
        }
      }
      return;
    } else if (this.state.filterList.length < 2) {
      e.className = "Filter-Disabled";
      this.setState((prevState) => ({
        filterList: [...prevState.filterList, e.innerText],
      }));
    }
  }
  FetchPopularApi() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=<< YOUR API KEY HERE >>&language=en-US&page=" +
        this.state.page
    )
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            data: res.results,
          });
        },
        (error) => {}
      )
      .then(() => {
        if (this.state.filterList.length > 0) {
          this.getfromDBGenre();
        } else {
          this.getfromDB();
        }
      })
      .catch((error) => console.log(error));
  }
  FetchTopRatedApi() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=<< YOUR API KEY HERE >>&language=en-US&page=" +
        this.state.page
    )
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            data: res.results,
          });
        },
        (error) => {}
      )
      .then(() => {
        if (this.state.filterList.length > 0) {
          this.getfromDBGenre();
        } else {
          this.getfromDB();
        }
      })
      .catch((error) => console.log(error));
  }
  FetchRecommendedApi() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.state.movie_id +
        "/recommendations?api_key=<< YOUR API KEY HERE >>&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            data: res.results,
          });
        },
        (error) => {}
      )
      .then(() => {
        if (this.state.filterList.length > 0) {
          this.getfromDBGenre();
        } else {
          this.getfromDB();
        }
      })
      .catch((error) => console.log(error));
  }
  FetchSimilarApi() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.state.movie_id +
        "/similar?api_key=<< YOUR API KEY HERE >>&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            data: res.results,
          });
        },
        (error) => {}
      )
      .then(() => {
        if (this.state.filterList.length > 0) {
          this.getfromDBGenre();
        } else {
          this.getfromDB();
        }
      })
      .catch((error) => console.log(error));
  }
  fetchTrailer() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.state.movie_id +
        "/videos?api_key=<< YOUR API KEY HERE >>&language=en-US"
    )
      .then((res) => res.json())
      .then(
        (res) => {
          let trailer = res.results[0].key;
          this.setState({
            trailer: trailer,
          });
        },
        (error) => {}
      )
      .then(() => this.setState({ isButtonEnabled: true }))
      .catch(
        () => this.setState({ trailer: "" }),
        this.setState({ isButtonEnabled: true })
      );
  }
  getfromDBGenre() {
    this.reversegetGenre(this.state.filterList);
    let rndmArray = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.filterList_Id.length === 1) {
        if (
          this.state.data[i].genre_ids.includes(this.state.filterList_Id[0])
        ) {
          if (this.state.data[i].vote_average >= this.state.valueSlider) {
            rndmArray.push(this.state.data[i]);
          }
        }
      } else if (this.state.filterList_Id.length === 2) {
        if (
          this.state.data[i].genre_ids.includes(this.state.filterList_Id[0])
        ) {
          if (
            this.state.data[i].genre_ids.includes(this.state.filterList_Id[1])
          ) {
            if (this.state.data[i].vote_average >= this.state.valueSlider) {
              rndmArray.push(this.state.data[i]);
            }
          }
        }
      }
    }
    var rndm = Math.floor(Math.random() * rndmArray.length);
    if (rndmArray[rndm] === undefined) {
      if (this.state.isLoading === false) {
        return;
      } else {
        this.componentDidMount();
      }
    } else {
      this.getGenre(rndmArray[rndm].genre_ids);
      if (this.state.banList.includes(rndmArray[rndm].title)) {
        return;
      }
      this.setState({ header: rndmArray[rndm].title });
      this.setState({ movie_id: rndmArray[rndm].id }, () => {
        this.fetchTrailer();
      });
      this.setState({ overview: rndmArray[rndm].overview });
      this.setState({
        poster: "https://image.tmdb.org/t/p/w185" + rndmArray[rndm].poster_path,
      });
      this.setState({ vote_average: rndmArray[rndm].vote_average });

      //genre Function
      this.getGenre(rndmArray[rndm].genre_ids);

      let str = rndmArray[rndm].release_date.toString();
      let n = str.indexOf("-");
      str = str.slice(0, n);
      this.setState({ release_date: "(" + str + ")" });
      this.setState({ isButtonEnabled: true });
      this.setState({ isLoading: false });

      // eslint-disable-next-line no-implied-eval
      var highestTimeoutId = setTimeout(";");
      for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
      //
    }
  }
  getfromDB() {
    let rndmArray = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].vote_average >= this.state.valueSlider) {
        rndmArray.push(this.state.data[i]);
      }
    }
    let rndm = Math.floor(Math.random() * rndmArray.length);
    if (rndmArray[rndm] === undefined) {
      if (this.state.isLoading === false) {
        return;
      } else {
        this.componentDidMount();
      }
    } else {
      if (this.state.banList.includes(rndmArray[rndm].title)) {
        return;
      }
      this.setState({ header: rndmArray[rndm].title });
      this.setState({ movie_id: rndmArray[rndm].id }, () => {
        this.fetchTrailer();
      });
      this.setState({ overview: rndmArray[rndm].overview });
      this.setState({
        poster: "https://image.tmdb.org/t/p/w185" + rndmArray[rndm].poster_path,
      });
      this.setState({ vote_average: rndmArray[rndm].vote_average });

      //genre Function
      this.getGenre(rndmArray[rndm].genre_ids);

      let str = rndmArray[rndm].release_date.toString();
      let n = str.indexOf("-");
      str = str.slice(0, n);
      this.setState({ release_date: "(" + str + ")" });
      this.setState({ isButtonEnabled: true });
      this.setState({ isLoading: false });

      // eslint-disable-next-line no-implied-eval
      var highestTimeoutId = setTimeout(";");
      for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    }
  }
  getRandomPage() {
    let rndm = Math.floor(Math.random() * 500) + 1;
    let rndmCtgr = Math.floor(Math.random() * Math.floor(2));
    let rndmSimilar = Math.floor(Math.random() * 10) + 1;

    if (rndmCtgr === 1) {
      rndm = Math.floor(Math.random() * Math.floor(381)) + 1;
    }
    if (this.state.valueSlider >= 8) {
      rndmCtgr = 1;
      rndm = Math.floor(Math.random() * Math.floor(16)) + 1;
    }
    this.setState({ isButtonEnabled: false });
    this.setState({ page: rndm }, () => {
      if (rndmCtgr === 0 && rndmSimilar !== 10) {
        let rndmCtgr2 = Math.floor(Math.random() * Math.floor(2));
        if (rndmCtgr2 === 0) {
          this.FetchPopularApi();
        } else {
          rndm = 0;
          this.FetchPersonalApi();
        }
      } else if (rndmCtgr === 1 && rndmSimilar !== 10) {
        this.FetchTopRatedApi();
      } else if (rndmSimilar === 10) {
        if (this.state.data.length > 0) {
          let rndmCtgr2 = Math.floor(Math.random() * Math.floor(2));
          if (rndmCtgr2 === 0) {
            this.FetchSimilarApi();
          } else {
            this.FetchRecommendedApi();
          }
        } else {
          this.FetchPopularApi();
        }
      }
    });
  }
  RefreshFunction() {
    if (this.state.isButtonEnabled === true) {
      this.setState({ isLoading: true });
      this.setState({ trailer: "" });
      setTimeout(() => {
        if (this.state.isLoading === true) {
          this.setState({ isLoading: false });
          this.setState({ isButtonEnabled: true });
          return;
        } else {
        }
      }, 5000);
      this.getRandomPage();
      return;
    }
  }
  changeSlider(e) {
    this.setState({ valueSlider: e.target.value });
  }

  returnTimer() {
    if (this.state.isLoading === true) {
      return <div className="loader"></div>;
    } else {
      return <div />;
    }
  }
  FetchPersonalApi() {
    var nameArr = text.split(",");
    let num = Math.floor(Math.random() * Math.floor(nameArr.length));
    var movie = nameArr[num];
    movie = movie.replace(/ /g, "+");
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=<< YOUR API KEY HERE >>&query=" +
        movie
    )
      .then((res) => res.json())
      .then(
        (res) => {
          let array = res.results;
          array.splice(1);
          this.setState({
            data: array,
          });
        },
        (error) => {}
      )
      .then(() => {
        if (this.state.filterList.length > 0) {
          this.getfromDBGenre();
        } else {
          this.getfromDB();
        }
      })
      .catch((error) => console.log(error));
  }
  changeFilterShow() {
    if (this.state.filterhide === "filter-container-small") {
      this.setState({ filterhide: "filter-container" });
    } else {
      this.setState({ filterhide: "filter-container-small" });
      let emptarray = [];
      this.setState({ filterList: emptarray });
      let allbuttons = document.getElementsByClassName("Filter-Disabled");
      for (let i = 0; i < allbuttons.length; i++) {
        if (allbuttons[i] !== undefined) {
          allbuttons[i].className = "Filter";
        }
        if (allbuttons[i] !== undefined) {
          allbuttons[i].className = "Filter";
        }
      }
    }
  }

  componentDidMount() {
    this.getRandomPage();
  }
  render() {
    return (
      <div className="App">
        <div className="Card">
          <div className="Header_Release_Date_Container">
            <h1 className="Header">{this.state.header}</h1>
            <p className="Release_Date">&nbsp;{this.state.release_date}</p>
          </div>
          <p className="Genre_List">{this.state.genre_list}</p>
          <p className="Overview">{this.state.overview}</p>
          <img className="Poster" src={this.state.poster} alt="" />
          <p>Rating: {this.state.vote_average}/10</p>
          {this.returnTimer()}
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="10"
              value={this.state.valueSlider}
              className="slider"
              id="myRange"
              onChange={(e) => {
                this.changeSlider(e);
              }}
            />
            <p className="RatingSlider">Rating > {this.state.valueSlider}</p>
          </div>
          <button
            className="Refresh"
            onClick={() => {
              this.RefreshFunction();
            }}
          >
            REFRESH
          </button>
          <button
            onClick={() => {
              this.changeFilterShow();
            }}
            className="filter-button"
          ></button>
          <div className={this.state.filterhide}>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Action
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Adventure
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Animation
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Comedy
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Crime
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Documentary
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Drama
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Family
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Fantasy
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              History
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Horror
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Music
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Mystery
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Romance
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Science Fiction
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              TV Movie
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Thriller
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              War
            </button>
            <button
              onClick={(e) => {
                this.addtoFilterList(e.target);
              }}
              className="Filter"
            >
              Western
            </button>
          </div>
          <div className="player-wrapper">
            <YouTube videoId={this.state.trailer} className="react-player" />
          </div>
          <div className="Footer"></div>
        </div>
      </div>
    );
  }
}
