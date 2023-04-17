const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.main = null;
  }
  root() {
    return this.main;
  }

  add(value) {
    this.main = addWithin(this.main, value);
    function addWithin(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (node.data < value) {
        node.right = addWithin(node.right, value);
      } else {
        node.left = addWithin(node.left, value);
      }
      return node;
    }
  }

  has(value) {
    return check(this.main, value);

    function check(node, value) {
      if (!node) {
        return false;
      }
      if (node.data === value) {
        return true;
      }
      if (node.data < value) {
        return check(node.right, value);
      }
      return check(node.left, value);
    }
  }

  find(value) {
    return findNode(this.main, value);

    function findNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      if (node.data < value) {
        return findNode(node.right, value);
      }
      return findNode(node.left, value);
    }
  }

  remove(value) {
    this.main = removeNode(this.main, value);
    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (node.data < value) {
        node.left = removeNode(node.left, value);
      } else {
        node.right = removeNode(node.right, value);
      }

      if (!node.right && !node.left) {
        return null;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }

      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.value;
      node.right = removeNode(node.right, minFromRight);
    }
  }

  min() {
    if (!this.main) {
      return null;
    }
    let minValue = this.main.left;
    while (minValue.left) {
      minValue = minValue.left;
    }
    return minValue.value;
  }

  max() {
    if (!this.main) {
      return null;
    }
    let maxValue = this.main.right;
    while (maxValue.right) {
      maxValue = maxValue.right;
    }
    return maxValue.value;
  }
}

module.exports = {
  BinarySearchTree,
};
