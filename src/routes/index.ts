import { Hono } from "hono";
import artistRouter from "@/features/artists/artists.routes";
import albumRouter from "@/features/albums/albums.routes";
import trackRouter from "@/features/tracks/tracks.routes";
import genreRouter from "@/features/genres/genres.routes";
import mediaTypeRouter from "@/features/media_types/media_type.routes";
import customerRouter from "@/features/customers/customers.routes";
import invoiceRouter from "@/features/invoices/invoices.routes";
import invoiceItemsRouter from "@/features/invoice_items/invoice_items.routes";
import employeeRouter from "@/features/employees/employees.routes";
import playlistRouter from "@/features/playlists/playlists.routes";

const router = new Hono();

router.route("/artists", artistRouter);
router.route("/albums", albumRouter);
router.route("/tracks", trackRouter);
router.route("/genres", genreRouter);
router.route("/media-types", mediaTypeRouter);
router.route("/customers", customerRouter);
router.route("/invoices", invoiceRouter);
router.route("/invoice-items", invoiceItemsRouter);
router.route("/employees", employeeRouter);
router.route("/playlists", playlistRouter);

export default router;
