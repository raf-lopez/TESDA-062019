<?php
/**
 * Returns all grocerific products as JSON
 *
 * @package all.php
 * @author Raf <raffylopez@gmail.com>
 * @version 0.1
 * @copyright Raf <raffylopez@gmail.com>
 * @license MIT
 */

  require("includes.inc");
  $query = "SELECT p.id, p.description, size, price, aisle_id, a.description AS aisle_description from grocerific.products p JOIN grocerific.aisles a ON p.aisle_id=a.id ORDER BY p.id";
  if ($conn->connect_error) {
    die(DB_CONNECT_ERROR_NOTIF);
  }

  $result = $conn->query($query);

  $accumulatedRows = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $accumulatedRows[] = $row;
    }
    echo json_encode($accumulatedRows);
  } else {
    echo json_encode(array());
  }

  $conn->close();
