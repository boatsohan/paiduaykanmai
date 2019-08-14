from waitress import serve
import database
serve(database.app, host='0.0.0.0', port=8080)