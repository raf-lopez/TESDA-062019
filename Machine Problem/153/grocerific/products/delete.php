<?php
/**
 * Deletes a product from the grocerific database. Must be
 * provided with a request parameter named 'id'
 *
 * @package delete.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $productId = $_REQUEST["id"];
  $query = "DELETE FROM products WHERE id=?";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
  }

  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $productId);
  $success = $stmt->execute();
  $stmt->store_result();

  $arr["success"] = $conn->affected_rows;

  $stmt->close();
  $conn->close();

  echo json_encode($arr);

