let posts = [
    { id: 1, title: 'Paris, France', image: 'https://wildmorocco.com/storage/2024/12/wild-morocco-blog-images-01-400x250.jpg', description: 'Experience the City of Lights with romantic streets, and world-famous cuisine.' , nb_like: 20},
    { id: 2, title: 'Safari Adventure, Kenya', image: 'https://liveworkplaytravel.com/wp-content/uploads/2022/05/SoloTravellerFemale-400x250.jpg', description: 'Witness the majestic wildlife of Africa on a guided safari through Kenya’s national parks.' , nb_like: 19},
    { id: 3, title: 'Tokyo, Japan', image: 'https://fairfieldcountylook.com/wp-content/uploads/2024/09/iStock-467903903-400x250.jpg', description: 'Dive into a futuristic city with ancient temples, neon streets, and exquisite sushi.' , nb_like: 30},
  ];

exports.getAllPosts = (req, res) => { 

    const limit = parseInt(req.query.limit);

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
  
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        nb_like: req.body.nb_like,
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
  post.image = req.body.image;
  post.description = req.body.description;
  post.nb_like = req.body.nb_like;

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