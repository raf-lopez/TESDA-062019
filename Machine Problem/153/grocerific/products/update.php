<?php
/**
 * Updates a product in the grocerific database. Must be
 * provided with a request parameter named 'id'
 *
 * @package update.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $productId = $_REQUEST["id"];
  $productDescription = $_REQUEST["description"];
  $productSize = $_REQUEST["size"];
  $productPrice = $_REQUEST["price"];
  $productAisleId = $_REQUEST["aisle_id"];
  $query = "UPDATE products SET description=?, size=?, price=?, aisle_id=? WHERE id=?";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
    }

  $stmt = $conn->prepare($query);
  $stmt->bind_param("ssdii", $productDescription, $productSize, $productPrice, $productAisleId, $productId);

  $success = $stmt->execute();
  $stmt->store_result();

  $arr["rows_affected"] = $conn->affected_rows;

  $stmt->close();
  $conn->close();

  echo json_encode($arr);

