const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);


//√√√√√√√√
it("gets the test endpoint", async () => {
  const response = await request.get("/test");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("pass!");
});


// √√√√√√
it("tests the /api/login endpoint response if users is not found", async () => {
  const response = await request.post("/api/login");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("User not found");
});



// √√√√√√√
it("tests the forum multiple posts endpoint", async () => {
  const response = await request.post("/api/forum/posts");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Forum posts retrieved successfully");
});




// √√√√√√√
it("tests the forum post endpoint", async () => {
  const response = await request.post("/api/forum/post");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Forum post created successfully");
});


it("test the forum reply endpoint", async () => {
  const response = await request.post("/api/forum/reply");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Forum reply created successfully");
});

// √√√√√√
it("tests the form multiple replies endpoint", async () => {
  const response = await request.post("/api/forum/replies");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Forum replies retrieved successfully");
})


//√√√√√√√
it("test the profile end point", async () => {
  const response = await request.post("/api/profile");
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Profile retrieved successfully");
});


it('checks for non-existent route', async () => {
  const response = await request.get('/fake-route');
  expect(response.status).toBe(404);
});

