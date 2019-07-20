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
  $query = "INSERT INTO products SET id=?, description=?, size=?, price=?, aisle_id=?";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
    }

  $stmt = $conn->prepare($query);
  $stmt->bind_param("issdi", $productId, $productDescription, $productSize, $productPrice, $productAisleId);
  $success = $stmt->execute();
  $stmt->store_result();

  if ($success) {
    $arr["success"] = 1;
  } else {
    $arr["success"] = 0;
  }


  $stmt->close();
  $conn->close();

  echo json_encode($arr);

