import React from "react";
import { Carousel } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import FaceMakeupCard from "../components/FaceMakeupCard";
import EyesMakeupCard from "../components/EyesMakeupCard";
import LipsMakeupCard from "../components/LipsMakeupCard";
import FaceSkincareCard from "../components/FaceSkincareCard";
import EyesSkincareCard from "../components/EyesSkincareCard";
import LipsSkincareCard from "../components/LipsSkincareCard";
import BodySkincareCard from "../components/BodySkincareCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const pro = useSelector((state) => state?.product?.product);

  const productState = pro.products;
  console.log("product state", productState);
  const dispatch = useDispatch();
  useEffect(() => {
    getblogs();
    getallProducts();
  }, []);

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getallProducts = () => {
    const data = {
      page: 1,
      perPage: 40,
    };
    dispatch(getAllProducts(data));
  };

  return (
    <>
      <Container class1="home-wrapper-1 py-3">
        <Carousel>
          <Carousel.Item>
          <img
              className="w-100 h-400"
              src="https://t4.ftcdn.net/jpg/03/21/68/65/360_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Get A New Look</h3>
              <p>
                Make an effort to discover all brands and get an entire new
                look.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 h-400"
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Beauty on the Go</h3>
              <p>Wash twice a day, morning and night for glowing skin</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-100 h-300"
              src="https://img.freepik.com/free-photo/beauty-portrait-ginger-woman-with-long-hair-posing-with-green-leaf_171337-927.jpg?w=740&t=st=1688465924~exp=1688466524~hmac=60cb4082e0792662bee4f3576fc27bfdf16c62ae75f09f45c4cee49788d459e9"
              alt="Third Slide"
            />
            <Carousel.Caption>
              <h3>Get Products Recommendation While Staying At Home</h3>
              <p>
                Make an effort to discover all brands and get an entire new
                look.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container class1="home-wrapper-2 py-2">
        <div className="row">
          <div className="col-6">
            <a href="/face-makeup">
              <img
                style={{ width: "100%" }}
                src="https://cdn.shopify.com/s/files/1/0610/1087/0511/files/face.jpg?v=1678369025"
              />
            </a>
          </div>
          <div className="col-6">
            <a href="/lips-makeup">
              <img
                style={{ width: "100%" }}
                className="img-fluid"
                src="https://cdn.shopify.com/s/files/1/0610/1087/0511/files/Lips_58ac703a-3280-4fb3-8cc8-65c33ca81b6a.jpg?v=1678369025"
              />
            </a>
            <br />
            <br />
            <a href="/eyes-makeup">
              <img
                style={{ width: "100%" }}
                className="img-fluid"
                src="https://cdn.shopify.com/s/files/1/0610/1087/0511/files/Eyes_083a227f-fbca-474e-9705-14dddea23b5b.jpg?v=1678369025"
              />
            </a>
          </div>
        </div>
      </Container>

      {/*<Container className="featured-wrapper py-0 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Featured Collection</h3>
          </div>
          <FaceSkincareCard />
          <EyesSkincareCard />
          <LipsSkincareCard />
          <BodySkincareCard />
          <FaceMakeupCard />
          <EyesMakeupCard />
          <LipsMakeupCard />
        </div>
      </Container>*/}

      <Container>
        <div>
          <a href="/About-Us">
            <img
              style={{ width: "100%" }}
              src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/we-are-her.jpg?v=1683876972&width=1500"
            />
          </a>
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_5_2ae2699e-8126-42e5-8fd7-6025c4fc828b.png?v=1670321180"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#FFC999",
                  fontWeight: "bold",
                }}
              >
                CRUELTY FREE
              </p>
            </div>
          </div>
          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_6_de821146-d6c1-41cf-b5ab-5792bb696b0d.png?v=1670321186"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#A2E3BA",
                  fontWeight: "bold",
                }}
              >
                PARABEN AND SULPHATE FREE
              </p>
            </div>
          </div>
          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_9_08c391a9-f66c-40ee-a19e-60a56bb5bd65.png?v=1670321186"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#8DB8E9",
                  fontWeight: "bold",
                }}
              >
                100% VEGAN
              </p>
            </div>
          </div>
          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_10_de61ac22-b499-45e4-9767-4d9759d9761b.png?v=1670321186"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#FF6B00",
                  fontWeight: "bold",
                }}
              >
                DAILY USE
              </p>
            </div>
          </div>

          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_11_bffa64d3-9eae-49de-89d9-d3be59035488.png?v=1670321186"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#FFA4B4",
                  fontWeight: "bold",
                }}
              >
                CLEAN & KIND
              </p>
            </div>
          </div>

          <div className="col-2">
            <div className="famous-card position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/Asset_7.png?v=1670321186"
                className="img-fluid"
                alt="Famous"
                style={{ width: "180px", height: "180px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#DABEDC",
                  fontWeight: "bold",
                }}
              >
                NON TOXIC
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags == "special") {
                return (
                  <SpecialProduct
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    image={item?.images[0]?.url}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    key={index}
                  />
                );
              }
            })}
        </div>
      </Container>

      <Container
        style={{ backgroundColor: "#EEEFF7" }}
        class1="marque-wrapper py-5"
      >
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-2 w-25 ">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="brand"
                  />
                </div>

                <div className="mx-4 w-25 ">
                  <img
                    src="data:image/png;base64,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"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    style={{ width: "300px" }}
                    src="https://comexposium-healthcare-uploads.s3-eu-west-1.amazonaws.com/users/169034/logo/SExkzWd6vAH4I6lHHCRh4aBT55dJg9U6bGVYwUVp.png"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    src="data:image/png;base64,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"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    style={{ width: "350px" }}
                    src="data:image/png;base64,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"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    style={{ width: "300px" }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAflBMVEX///8dHRsAAAAMDAisrKx8fHyvr67d3dwPDwwTExFubm7v7+7s7OxaWlkZGRcbGxn29va5ublgYF/Hx8eVlZTY2NiGhoXR0dHl5eUyMjBLS0o6OjklJSOgoJ9ra2qamppBQUBUVFPAwMBISEc9PTwnJyZ3d3eNjY2AgH9dXVyLvebAAAAEaElEQVR4nO3Z6XayOhiGYXlxAK2RySpqtdXa1vM/wR0wDE4VhH7tWvu+frUuCeTJSOx0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+lQTQcRtOGhUyTQgZVvz2KXkV2L17t28xnW7/fwLb+LU9EIo4j8uo3KMN/PRbyWenb8w8R17JckedRjZsMNgtpLnyshkeeWCn96FGdRy+MorTuCalQwnwotmXY0nuqeJd+nN+lCSUP1TGrqmTlTETWs9rXz9Yik6wIuVv1QSDO8amViWs4r3AX3xHVPKm0krVrWJKGpUxbOxL3a12t2/tYd8tWFcKavZmvu/Iam+o7sr471wVZe7j2rw7DJCy1eBbz6EpPJFWaOjE/uWqh7oUVLsxA0lHpZ/Zj868jh2/XF29vm14oi69Ntwm/2QSfhOWOO97LKpsSbBlXiT8cZ3OPK5Ze2A7u92GF73lUCzPat8uLj65ZucfH+mjUK9pgwtLCt6L2qzvLuvdinWc7LoXVDeL4cFLEtuhG41I3Cncnna14qugtjtfHKeFgp3PNV8NVvw1FWGfj6uv2TDLoXRm1RVieI65SennN+5m/yieo4KxYPY1lcS23+Q0kKUHPoPrvbTqpSv2l5weUw9K6xYwti+3VK7Y7KdaDbv5xEVZoFlgxW7fuRL5b+qaHbIGU2FyxyUrQX18q88cfcBaWbupA7Ilpa3dz3ve9jW16gt5pBOXmLg3D6LjwPKf/vNh5VLc2VYO1iV/J6jj0hscSdFPMpRT7b7sIq9N5+sxGmQ5kWF6opsNsU6XH3+fpDrQ8Z3XCfjdMc95kF3y/Xdeb+iwuJ+2so223nzZFXz/fxGpay5ZcCUvzl9lodOQ9a9Z+6cPlRVuPL1dDLyqi+rwzPz/1TFy6gV5Knycj0vmoXa2fcT2scidy06e/3d2Mi7A8vVxkF2yqPEpk1lf9/aj4UJdhf9Wt1Q+5FVY2PSUvQdNOeCgmMudiIkudhTX6Oukpm/Xwrt4he/mbFD2xm2yalz9Q8UfcDkvzd7pTeJ3uvthU3Vgiz8IqzUFu15xs3Fd+Uc7muGk6wTc9QWrJt2HphaozL2+qerc3X6WwSqub1S+GY01m9XR1j1artqv9mDth6S/ozbqtJspOX2puy8OaBuV906hXnMjUj0vvy5JxaDnLP7B/rxCWFn7EbnzvzSwNa1Q+WNA78kHw6OlAfiQx36m0tL+w1aoSViVpWP7pwULn4f5QOpJYpivLROL+r/euVsOy8qjeGr/L5acU2dGinjIXn/5sOmig4VtTu2GZzjBuZfWa7c4Pkpuf/cVVj7Gvaj2sKiefVeUToO5Xj64Sp5xG62rLYVU8U68sW1rVeyu/V+iJosnTeOIqObRQrUCUqvFrTWVzvWlTSr8A9cfJOLKbqfbiddN2uQraqOEoWO1r/Q5Y2by33x/fDqf+5rnXxPOfOEMEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/r3/ALmlP9ixI5iPAAAAAElFTkSuQmCC"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHDxUPBxMTEBAWEBAWFxUVFRUVEhIWFhYZGhcYGRoYHSogGRwlHRgVITEiJikrMjouGB8zODMsPigtLisBCgoKDg0OGhAQGy8mICYtLS81LzIyLy0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLf/AABEIALEBHQMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYCBwEDBAj/xAA8EAACAQMCBAQEBAIIBwAAAAAAAQIDBBEFIQYSMUEHE1FhInGBkRQyUqEWkhUjJDM0YnSyJUNyg7PB0v/EABoBAQADAQEBAAAAAAAAAAAAAAABAwQFAgb/xAAvEQEAAgIBAgQGAAYDAQAAAAAAAQIDEQQSIQUxQVETFCIyYXEjM4GhsfBC0eEV/9oADAMBAAIRAxEAPwDeIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAea+v6enQ8y+qQpQ/VNqK/cmKzPk9Upa86rG5Vyr4iafTePOlL3jTqNffBdHGyT6NceH55jekrpPEtrrD5dPrQnL9GeWf8ALLDPFsV6+cKMnHyY/uhLJlalyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDcU6/Dh62lXrLml+WEP1zfRfLu36JnvHjnJbS/jYJzZOhpnlvOM7rOHXq/y06MW+2doR/d47nT+jDV9DE4uLj79v8ys9v4Vzxm7uqcJPtGDkl9XJZ+xRPLj0hit4tv7KzpDcRcCXOgx86DVenF5c6acZ08dJOOcr5pvHsWU5FL9pacPiGPN9M9v2t3hxxnLUn+D1aXNVUc06j61EusZf5l691n03z8jB0/VHk5/P4UY/wCJTybCMjlmQjbB1ox2k0n6NrJOpetTPlDPmIQZA653Eae05RT92kTqfZMVmfKGampfl3I0iXOQOt3EE8OUc+mVknUvXTPs7E89CHkyBg60YvDaT9MrJOpT0z7M1LPQhHczgDCVaMPzyS+bSJ1KYrMslNS/LuNIntPdzkgcSmo7y2XuI7kd/JjCtGf5Gn8mmTMTHomazHnDPJCGMqihvNpfPYR38k6mfJzGop7waa9nknUkxrzZIhAAAAAAAABwwNQeMF+6t5ToZ+GnRUsduao3n9or7nR4lfp6nd8KpFcc3lcOHtJqaFpX/CYRndzpKbzhc1SS2y32injHt7mbJeL5Pq8mDkZYy8j+JP0w15fcK6pf1HO9o1as22+aVSD+3xbL2RrjJgiHWpyuLSuomNfpfeANNvtOhOlr2HQcfgU6nPOL7x7/AAtds9vcy57UtMTRyudlw3tFsUd2sdWlHQ9RqS06ScKNzzQcXthNS5U12W8fobaxN8epdrFE5cERf1h9AUp+ZFSXRpP7o5UxqXy0xqZa/wCPeI61S6hpejT8qc3BVKucOPP0in2wvib69EjXgxx09c+jqcLjVik5r+Uenu9FPgPTYw/t9R1auN6s67Um+7W+F+54nNk32jt+nmebyN/TGo9tIChqc+CtQjQpXH4mxqOOznz+XGTxnq1Fxe+2E12LZrGWm9alptjrysE3murQuHiRqdbSrBz09uEnUhBzXWnGXVr0b2Wf8xn49ItfUsPAxUyZoi/krfCPDGm67bxqX03c3Uop1FKtJThJ9VyqWcL1ecl+XJkpbUR2a+TyuRivNaxqsfhatA4PpaDWdWxq1+RxaVKVRuksvrju/mUXzTeNTDDm5dstdWiP2rfixqta1lQt6M50aFTLnOGVKWJJOOV6J5wnuXcakTufVs8MxUnqtMbmHs03gTStSpKVo/Pyv7yNaTnn1eHhP2web5slZ7wrvzeTjtMTGvxpY+G9AjoEJQo1a1VSllebNy5F2UV0SKb5Otjz55zTuYhU+OuIq1xeQ0vRqnkyk4KpVTw4uSzhNbpKPxNrffGxfgxxFZvZv4fGrGOc943p6o8B6bGOLyo6lTG9WVdqbfr1wjz8fJ6Qrnm8iZ3FdR+kFY6pU4O1GNrG4d1ZVJQSzPn8tTlyprd8ri+qWzW+PS6afFpvWpar4o5OGb9OrQsHizeVLWypu0qTp81zGMnCTi3Hy5vDa3xlIp4lYm0s3hlK2zTFo9Hm0Hw9s9QtaVe+VWpUqUac5N1Gt5RT2x8yb8i9bTFdJzc/LS9q112n2Qus21Tw/vqD0qrUdvVe9KUm1iMoqcWuj2ksPGS2kxmpMzHdpxWjl4bReI3Hq2NxLrK0K0nczXM4pcsc45pS2is9tzHjp1205PHwzlyRRr7hvQa/HPNd8Q16nk87jGnF4jJrryrpGK6dMvHU15L1w/TWHV5GanE/h4qxv3WCfhlZwWbGVe3n2nCq8r33Kvmrz5skeI5Zn6oif6JHibWHwnYRll1ayjClBz3c58v5peuycmeMdPiXVcfD8xl16eascO8N0+IKKvOLa8686nxRpyquEIR7bJrGeuFhb9C6+S1J6aQ2Z+RbFPw8Fda9dPLxPotPhiCu+FLl0pQlHmpKtzpptLOG/iSzunnb5HrFebzrJD1xs05pmmavn66X7hHWv6es6dw0oyfNGaXRTi8Sx7d/qZctOi0w5vJw/ByTRMlagAAAAAAAYGmvF60dO+jUf5alvFL5wclL9pR+50eJbePX5d/wq8Timv5Xyhcz17SFPRZ8ld0I8rTWY1YYzF/VNfUyTEUy6s5lqRi5Mxk8t/2aurcZ6jQk6de6qQlF4lGUKSlF+j+DJvjBjnv0u3Xhca3etY1/X/t007m/4lbhRncXOOqjJqC+eGo/cma4qecPVqYMHftCIp2sq81RgvjlNU0vSUny4+7LJmIjcL5vEV6/R9JUIeVFRXaKX2WDizPeXyFp3My07x1aRstZ8zVYudtVlRm+qUoYUJrK32xnb1XqdHBbeKdebvcPJN+N00842vlDgXTKsVOjbQlFpNNTqOLT6NfFuZfj5Y7bcy3O5MTMTaf7Ox8F6bbtc1vSi3JJZlLd+izLdiM+X3R87yJj7p0n7qMJwcbvldN7NTxyvO2HnYpjfoy13vcean6n4Z2ly+awdS2nnK5Jc0U/lLdL2TRorybx2l0KeJ5a/fqYQ/DWp3ehaotL1Ct+JpN8qby3HMHOMk38S2WHFt+xZkrW+PriNL+RixZuPOasalsHVLChqcfJ1KEKkZdIy6trvHvn3Rkre1e9XLx3vjnqpKnX/hlSg/M0GtVtqnb4nKOf+pYmvuzRXkz/AMob6eJ2ntkiJg8M+ILjUKla01SXmuj0qbN7ScXFtfmWVs+vUcnHFYi0eqfEOPSkVvT1VfjKzhY6256xHmtqtSnN7tKVNxUJbrf4Wu3saMVurDqs92zi3m/F1j+6F+o8B6ZUSlStoSi1lNTqNNPuviMfx8sdtuXPO5Mdpt/h2Lg3TbWUf7PSjJyXLmUsuS3WMy3e2R8fJMa28zy89omOrshvGP8AwNL/AFUf/HULeH98tPhf82f0tPCv+Atv9NQ/2Iz5Pvlj5P8AOv8AuVF8Yv7+z/7/APupGrifbb/fd0vC/syf77rF4l2M77TJfh8t05U6jS3bjH832Tb+hTx7RXJuWTw/JFOREz67h5PCbVIXNl+Hi0qlKc8x7uMnzRkvbdr6HrlUmL7e/E8Voy9Xuu8nhbmaHOhQ/Fi2d/Y069q1OFOqpScXlcsouPNt2TaNXEtq+nT8MvFM0xPr2ePgXhzTtds4TrUIzrxzGrmdTm5l3wpbJrDPWfLkrbzeuZyeThyzETqFk/gTTobu1prHrKf/ANFMZ8nuy/Pcmf8AkmNHsKGn0lDSYxhRbclyPMXnq087ld7WtO7eajJe17bvPd7jyrAAAAAAAAK7xtw4uIrZwhiNaD5qcn05u8X7NbfZ9i3Bl+HbbVxOR8DJufL1ak0fW7vhCtKFNcjz/WUai+Fv12ezx0kn99joWx0yxt3cmDFyaRaZ/qs9TxIoXaT1GwjUml1coSX3lHJR8taO0WYv/mZKzqt0XrPiFXu6bo6ZThZ0mmnybzx7PZR+iz7llONWJ3Pdow+G1rbeSdyl/DLhKbmr7UouMY70YyW8m/8AmNdUl2+efQr5OaNdNWbxDl118Kk/ttIwuKjtb0SjrlPytSgpxzlPpKL9YtbpnumSaTuF2HNfFbqrKrUfD6pYfDpGoXNGnl/Ds0s+nLhfsXTyYn7qw2zz62/mY4l79H4HpWFeN1eVq93cRzyyqyyoZWHhfV9WebZ5tGo7Qqy8216dFaxEfhLcQaDR4go+TqKk48ykuWTi010fo/qmV0vak7hnw5rYbbor1PgevarkstTuoUunK8SaXonlY+xb8es95rDZbm0t3nHG0nw3wdQ0KbrRlOvcSzmrVeZb9cYW2fXr7nnJmteNeinkcy+WOnURHtDPibhKjxE41LmVSnVgsQqU5Ycd89HlfXGfcjHmnH5PPH5V8PaO8SiZcEXFReXX1O6lSxjl7temclnzFfPphf8AO44ncY42n+HOHaHDtN09Pi98c0pPM5tdMv8A9LYpvlnJO5Zs/Ivmnd3brmh0ddp+VqUOdJ5T6Sg/WL7CmSaTuHnFnvindJ0q9v4f1LBcmlahc0af6dnj+VpfsXTyIn7qw2z4hW/344lI6JwTS02urq6rVrq4inyzqyyo5WHhY9+7Z5vnm0aiIhTm5tr06KxEQ9XGPDn8TUIUXU8rlqqeeXmziMo4xlfqPOHJ8Odw8cXkzx79UeyU0qz/AKPt6dDPN5dOEObGM8qSzj6Hi1uqZlRkt1Wm3uguMOEv4lnRn5vleVz7cvNzczg/VY/J+5bhzfDify1cXlzgiYiPP/1Z1HbHsUfpj3uVN1Lw7oV6vn6XUq2dXLf9U1yJvq0usfkml7GivItEamNt+PxC9a9N4i0fl1S4Ane7azf3VxT7wzyxl7POSfmIj7axCfn4j+XSIW+1sYWtGNvSivKjBQUXuuVLGHnrsZ5tMzthm8zbq9VSuvDmlCr52iV61lP0pvMV7Lvj2zg0RyZmNW7t1PELdPTkrFv24l4fyvdtbvrq4h+jm5YS9n1HzERH01iD5+K/ZSIXKytY2VOFK2XLCEYxivSMVhIzzMzO5YLWm07l3EIAAAAAAAAOAIvW+H7fXFjUaUZtdJdJx+UluiymW1PKV2HkZMU/TKq1fCu2k80q1eK9Mwf7uJfHMv7Q2x4rl15QldH4CstLkp+W60001Kq+dJruo/lT98FV+ReyjLz82SNb1H4WlLHQpY3IAAAAAAGAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAjQYJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z"
                    alt="brand"
                  />
                </div>
                <div className="mx-4 w-25 ">
                  <img
                    style={{ height: "200px" }}
                    src="https://cdn.lovesavingsgroup.com/logos/nyx-professional-makeup.jpeg"
                    alt="brand"
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="Blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading"> Our Latest Blogs</h3>
          </div>
        </div>

        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 3) {
                return (
                  <div className="col-4 mb-3" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
