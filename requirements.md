# Problem Statement

Using the API provided by [Finnhub](https://finnhub.io/) (need to sign up for free API key), build a basic stock ticker query page which fetches data from 3 different endpoints. These endpoints will be used to retrieve company info, current stock prices, latest news, and similar companies (peers).

The goal of the problem is to exercise understanding of several aspects of developing interfaces at Lightkeeper in a relatively real world scenario. Reading API documentation, creating stateful applications, managing asynchronous dependencies, and designing reusable components are all fundamental in day-to-day work. We are looking for technical competence and completion not visual design and aesthetics, which is why the general layout was provided.

Though the position is certainly a react role, we don't strictly require the use of react for this project. The idea is that an individual fluent in one framework should be able to learn another fairly quickly with some guidance. We would much rather the project be completed in the framework you have the most confidence in and can speak clearly about during review. If that framework happens to be react; that's great.

We hope the problem statement paired with the provided graphic is enough to work from. If not, Anthony is available for answering any clarification questions you may have.

As a way to further demonstrate your grasp on the technology here are some bonus tasks to take into consideration. We do not want these to distract from the main goal so know there is no penalty for ignoring them. But if you find they align easily with the way you approach the original problem then you're welcome to include them.

URL parameterize the search query so you can navigate directly to a prefilled ticker
Swap the on (enter) event in the search input with a debounced (2-4 seconds) keydown event
Include the current "winning" (largest count) recommendation #recommendation-trends in the header on the right edge.