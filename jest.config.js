// const config ={
//     verbose: true,
// };


export default {
  verbose: true,
  testEnvironment: "node",
  transform: {}, 
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports",
        filename: "report.html",
        pageTitle: "Test Report",
      },
    ],
  ],
};

// export default config