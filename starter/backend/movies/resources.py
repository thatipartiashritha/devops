from flask import jsonify
from flask.views import MethodView

# Dummy database to hold movie examples
movies = {
    "123": {
        "title": "Top Gun: Maverick",
        "description": "Fighter planes",
    },
    "456": {
        "title": "Sonic the Hedgehog",
        "description": "Blue Sega character",
    },
    "789": {
        "title": "A Quiet Place",
        "description": "Scary monsters",
    },
}


class Movies(MethodView):
    def get(self, movie_id):
        if movie_id is None:
            return jsonify({
                "movies": [
                    {"id": i, "title": movie["title"]}
                    for i, movie in movies.items()
                ]
            })

        return jsonify({
            "movie": movies[str(movie_id)]
        })
