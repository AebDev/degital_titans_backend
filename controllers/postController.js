let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
  ];

exports.getAllPosts = (req, res) => { 

    const limit = parseInt(req.query.limit);

    console.log({limit})

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts); 
};
exports.getPostById = (req, res) => { 
    const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return res(error);
  }

  res.status(200).json(post);

};
exports.createPost = (req, res) => { 
  console.log({lngth : posts.length + 1})
  console.log({title: req.body.title})
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
      };
    
      if (!newPost.title) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return res(error);
      }
    
      posts.push(newPost);
      res.status(201).json(posts);
};
exports.updatePost = (req, res) => { 
    const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return res(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);

};
exports.deletePost = (req, res) => { 
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
  
    if (!post) {
      const error = new Error(`A post with the id of ${id} was not found`);
      error.status = 404;
      return res(error);
    }
  
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
    
};