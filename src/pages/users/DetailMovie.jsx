import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import NavbarComponent from "../../components/Header/NavbarComponent";
import { StarFill } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import "../../style/Detail.css";
import { getPostDetails } from "../../redux/actions/postActions";

function DetailMovie() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [detailMovie] = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <NavbarComponent />
      <Carousel controls={false}>
        <Carousel.Item>
          <img className="Carousel-img d-block w-100" src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`} alt="First slide" />
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-genres">
              {detailMovie?.genres &&
                detailMovie?.genres?.length > 0 &&
                detailMovie?.genres?.map((genre, i) => {
                  return i === detailMovie?.genres.length - 1 ? genre.name : `${genre.name}, `;
                })}
            </p>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate">
              <StarFill className="Icon-star" />
              {detailMovie?.vote_average ? detailMovie.vote_average.toFixed(1) : "-"}
            </p>
            <Button className="Movie-caption-button" variant="danger">
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default DetailMovie;
