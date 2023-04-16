import { IElementsState } from "../models/models";

export const elementsState: IElementsState = {
  Elements: {
    "headers": [

      {
        "id": 1,
        "name": "Header 1",
        "subject": {
          "name": "Header 1",
          "cover": "./img/cover/header1.jpg",
          "images": {
            "header1-img": "./img/Design_2.png",
          },
          "html": `
          <header class="header1">
            <div class="container">
              <h1>Startup Creative <span>Agency</span></h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </p>
              <div class="button-container">
                <a href="#" class="button">Read More</a>
                <a href="https://www.youtube.com/watch?v=I6C9th9rO0U" class="button button-empty">
                  Watch Video
                </a>
              </div>
            </div>
            <img src="header1-img" alt="Enthusiastic workers">
          </header>
          `
        }
      },

      {
        "id": 2,
        "name": "Header 2",
        "subject": {
          "name": "Header 2",
          "cover": "./img/cover/header2.jpg",
          "images": {
            "header2-img": "./img/Welcome_2.png",
            "header2-pin": "./img/searching_2.0.png",
          },
          "html": `
          <header class="header2">
          <img src="header2-img" alt="Workers on break">
            <div class="container">
              <h1>Your Landing Page is <span>cool</span></h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </p>
              <div class="button-container">
                <a href="#" class="button">Let"s do this!</a>
              </div>
              <ul>
                <li>
                  <h3>Responsive</h3>
                  <img src="header2-pin"/>
                </li>
                <li>
                  <h3>Editable</h3>
                  <img src="header2-pin"/>
                </li>
                <li>
                  <h3>Fancy</h3>
                  <img src="header2-pin"/>
                </li>
                <li>
                  <h3>Various</h3>
                  <img src="header2-pin"/>
                </li>
              </ul>
            </div>
          </header>
          `
        }
      },

      {
        "id": 3,
        "name": "Header 3",
        "subject": {
          "name": "Header 3",
          "cover": "./img/cover/header3.jpg",
          "images": {
            "header3-img": "./img/Education_2.png",
          },
          "html": `
          <header class="header3">
            <h1>Startup Creative <span>Agency</span></h1>
            <img src="header3-img" alt="Enthusiastic workers">
            <div class="container">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </p>
              <div class="button-container">
                <a href="#" class="button">Read More</a>
                <a href="https://www.youtube.com/watch?v=I6C9th9rO0U" class="button button-empty">
                  Watch Video
                </a>
              </div>
            </div>
          </header>
          `
        }
      },
    ],
    "content": [

      {
        "id": 4,
        "name": "Content 1",
        "subject": {
          "name": "Content 1",
          "cover": "./img/cover/content1.jpg",
          "images": {
            "content1-img": "./img/Workflow_2.png",
          },
          "html": `
          <article class="content1">
            <div class="container">
              <h2>Your landing page is cool</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </p>
              <ul>
                <li>
                  <h3>1000+ clients</h3>
                </li>
                <li>
                  <h3>Worlds No.1</h3>
                </li>
              </ul>
            </div>
            <img src="content1-img" alt="Enthusiastic workers">
          </article>
          `
        }
      },

      {
        "id": 5,
        "name": "Content 2",
        "subject": {
          "name": "Content 2",
          "cover": "./img/cover/content2.jpg",
          "images": {
            "content2-img": "",
          },
          "html": `
          <article class="content2">
            <div class="container">
              <h2>Your landing page is cool</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </p>
              <div class="button-container">
                <a href="#" class="button">Let"s do this!</a>
              </div>
            </div>
            <ul>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
            </ul>
          </article>
          `
        }
      },

      {
        "id": 6,
        "name": "Content 3",
        "subject": {
          "name": "Content 3",
          "cover": "./img/cover/content3.jpg",
          "images": {
            "content3-img": "",
          },
          "html": `
          <article class="content3">
            <ul>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
              <li>
                <h3>Lorem ipsum</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque at erat posuere, pellentesque est at, eleifend enim.
              </li>
            </ul>
          </article>
          `
        }
      },

    ],
    "footers": [

      {
        "id": 7,
        "name": "Footer 1",
        "subject": {
          "name": "Footer 1",
          "cover": "./img/cover/footer1.jpg",
          "images": {
            "footer1-img": "./img/Plants care_2.png",
          },
          "html": `
          <footer class="footer1">
            <div class="container">
              <div class="container__img">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <img src="footer1-img" alt="Worker, cat and plant">
              </div>
              <div class="container__list">
                <h4>Product help</h4>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Privacy policy</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Tools & Integrations</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">System</a></li>
                </ul>
              </div>
              <div class="container__list">
                <h4>Contact</h4>
                <ul>
                  <li>E-mail: lorem@ipsum.com</li>
                  <li>Telegram: @lo******um</li>
                  <li>WhatsApp: +00000000000</li>
                </ul>
              </div>
              <p class="sign">created with <span>pagebuilder</span></p>
            </div>
          </footer>
          `
        }
      },

      {
        "id": 8,
        "name": "Footer 2",
        "subject": {
          "name": "Footer 2",
          "cover": "./img/cover/footer2.jpg",
          "images": {
            "footer2-img": "./img/Message sent_2.png",
          },
          "html": `
          <footer class="footer2">
            <div class="container">
              <div class="container__img">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <img src="footer2-img" alt="Workers office desk">
              </div>
              <div class="container__list">
                <h4>Product help</h4>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Privacy policy</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Tools & Integrations</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">System</a></li>
                </ul>
              </div>
              <div class="container__list">
                <h4>Contact</h4>
                <ul>
                  <li>E-mail: lorem@ipsum.com</li>
                  <li>Telegram: @lo******um</li>
                  <li>WhatsApp: +00000000000</li>
                </ul>
              </div>
              <p class="sign">created with <span>pagebuilder</span></p>
            </div>
          </footer>
          `
        }
      },

    ]
  },

  current: [],
  editing: [],
  isLoading: false,
}
