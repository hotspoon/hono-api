import { Hono } from "hono"
import artistRouter from "../routes/artists.routes"
import albumRouter from "../routes/albums.routes"
import trackRouter from "../routes/tracks.routes"
import genreRouter from "../routes/genres.routes"
import mediaTypeRouter from "../routes/media_type.routes"
import customerRouter from "../routes/customers.routes"
import invoiceRouter from "../routes/invoices.routes"
import invoiceItemsRouter from "../routes/invoice_items.routes"
import employeeRouter from "../routes/employees.routes"
import playlistRouter from "../routes/playlists.routes"

const router = new Hono()

router.route("/artists", artistRouter)
router.route("/albums", albumRouter)
router.route("/tracks", trackRouter)
router.route("/genres", genreRouter)
router.route("/media-types", mediaTypeRouter)
router.route("/customers", customerRouter)
router.route("/invoices", invoiceRouter)
router.route("/invoice-items", invoiceItemsRouter)
router.route("/employees", employeeRouter)
router.route("/playlists", playlistRouter)

export default router
