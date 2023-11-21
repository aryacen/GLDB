import mongoose from "mongoose";

export const search_query = async (req, res, next) => {
    try {
        const pipeline = [
            {
                
              $search: {
                index: 'searchMovie', 
                text: {
                  query: req.params.prompt, 
                  path: [
                    'title', 'genres', 'overview'
                  ]
                },
              }
            }, {
              $project: {
                _id: 0, 
                tmdb_id: 1,
                title: 1, 
                rating: 1, 
                genres: 1,
                overview: 1,
                score: {
                  $meta: 'searchScore'
                }
              }
            }, {
              $limit: 500
            }
        ];
        const db = mongoose.connection.db;
        const result = await db.collection('MoviesInfo').aggregate(pipeline).toArray();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}