<?php
/**
 * Creates a new product, given request params
 *
 * @package new.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $productDescription = $_REQUEST["description"];
  $productSize = $_REQUEST["size"];
  $productPrice = $_REQUEST["price"];
  $productAisleId = $_REQUEST["aisle_id"];
  $query = "INSERT INTO products SET description=?, size=?, price=?, aisle_id=?";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
    }

  $stmt = $conn->prepare($query);
  $stmt->bind_param("ssdi", $productDescription, $productSize, $productPrice, $productAisleId);
  $success = $stmt->execute();
  $stmt->store_result();

  if ($success) {
    $arr["success"] = 1;
    $arr["new_product_id"] = $conn->insert_id;
  } else {
    $arr["success"] = 0;
  }


  $stmt->close();
  $conn->close();

  echo json_encode($arr);

