#include <iostream>
#include <string>
#include <vector>
using namespace std;

// =====================================================
// AlgoVis - Data Structure Visualizers Backend (C++)
// Simple college level implementation
// All core logic is here. Frontend JS mirrors this logic.
// Compile: g++ backend/visualizers.cpp -o algovis
// Run: ./algovis
// =====================================================

// ------------------ STACK ------------------
// LIFO: Last In First Out
class Stack {
    int arr[20];
    int top;
    int capacity;

public:
    Stack(int cap = 8) {
        capacity = cap;
        top = -1;
    }

    bool isEmpty() {
        return top == -1;
    }

    bool isFull() {
        return top == capacity - 1;
    }

    // Push element on top
    bool push(int value) {
        if (isFull()) {
            cout << "Stack Overflow! Cannot push " << value << endl;
            return false;
        }
        top++;
        arr[top] = value;
        return true;
    }

    // Remove top element
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! No element to pop" << endl;
            return -1;
        }
        int value = arr[top];
        top--;
        return value;
    }

    // See top element without removing
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        return arr[top];
    }

    // Display all elements
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return;
        }
        cout << "Stack (top to bottom): ";
        for (int i = top; i >= 0; i--) {
            cout << arr[i] << " ";
        }
        cout << endl;
    }

    int size() {
        return top + 1;
    }
};

// ------------------ QUEUE ------------------
// FIFO: First In First Out
class Queue {
    int arr[20];
    int front;
    int rear;
    int capacity;
    int count;

public:
    Queue(int cap = 8) {
        capacity = cap;
        front = 0;
        rear = -1;
        count = 0;
    }

    bool isEmpty() {
        return count == 0;
    }

    bool isFull() {
        return count == capacity;
    }

    // Add at rear
    bool enqueue(int value) {
        if (isFull()) {
            cout << "Queue Overflow! Cannot add " << value << endl;
            return false;
        }
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        count++;
        return true;
    }

    // Remove from front
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow! No element" << endl;
            return -1;
        }
        int value = arr[front];
        front = (front + 1) % capacity;
        count--;
        return value;
    }

    // See front element
    int getFront() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return arr[front];
    }

    void display() {
        if (isEmpty()) {
            cout << "Queue is empty" << endl;
            return;
        }
        cout << "Queue (front to rear): ";
        for (int i = 0; i < count; i++) {
            int index = (front + i) % capacity;
            cout << arr[index] << " ";
        }
        cout << endl;
    }

    int size() {
        return count;
    }
};

// ------------------ LINKED LIST ------------------
struct Node {
    int data;
    Node* next;
    Node(int value) {
        data = value;
        next = NULL;
    }
};

class LinkedList {
    Node* head;
    int listSize;

public:
    LinkedList() {
        head = NULL;
        listSize = 0;
    }

    // Insert at beginning
    void insertAtBeginning(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        listSize++;
    }

    // Insert at end
    void insertAtEnd(int value) {
        Node* newNode = new Node(value);
        if (head == NULL) {
            head = newNode;
        } else {
            Node* temp = head;
            while (temp->next != NULL) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
        listSize++;
    }

    // Insert at position (0-based)
    bool insertAtPosition(int value, int pos) {
        if (pos < 0 || pos > listSize) {
            cout << "Invalid position" << endl;
            return false;
        }
        if (pos == 0) {
            insertAtBeginning(value);
            return true;
        }
        Node* newNode = new Node(value);
        Node* temp = head;
        for (int i = 0; i < pos - 1; i++) {
            temp = temp->next;
        }
        newNode->next = temp->next;
        temp->next = newNode;
        listSize++;
        return true;
    }

    // Delete from beginning
    int deleteFromBeginning() {
        if (head == NULL) {
            cout << "List is empty" << endl;
            return -1;
        }
        Node* temp = head;
        int value = temp->data;
        head = head->next;
        delete temp;
        listSize--;
        return value;
    }

    // Delete from end
    int deleteFromEnd() {
        if (head == NULL) {
            cout << "List is empty" << endl;
            return -1;
        }
        if (head->next == NULL) {
            int value = head->data;
            delete head;
            head = NULL;
            listSize--;
            return value;
        }
        Node* temp = head;
        while (temp->next->next != NULL) {
            temp = temp->next;
        }
        int value = temp->next->data;
        delete temp->next;
        temp->next = NULL;
        listSize--;
        return value;
    }

    // Delete at position
    int deleteAtPosition(int pos) {
        if (head == NULL) {
            cout << "List is empty" << endl;
            return -1;
        }
        if (pos < 0 || pos >= listSize) {
            cout << "Invalid position" << endl;
            return -1;
        }
        if (pos == 0) {
            return deleteFromBeginning();
        }
        Node* temp = head;
        for (int i = 0; i < pos - 1; i++) {
            temp = temp->next;
        }
        Node* toDelete = temp->next;
        int value = toDelete->data;
        temp->next = toDelete->next;
        delete toDelete;
        listSize--;
        return value;
    }

    // Search value, return position or -1
    int search(int value) {
        Node* temp = head;
        int pos = 0;
        while (temp != NULL) {
            if (temp->data == value) {
                return pos;
            }
            temp = temp->next;
            pos++;
        }
        return -1;
    }

    // Display all nodes
    void display() {
        if (head == NULL) {
            cout << "List is empty" << endl;
            return;
        }
        Node* temp = head;
        cout << "Linked List: ";
        while (temp != NULL) {
            cout << temp->data;
            if (temp->next != NULL) cout << " -> ";
            temp = temp->next;
        }
        cout << " -> NULL" << endl;
    }

    int size() {
        return listSize;
    }

    bool isEmpty() {
        return head == NULL;
    }
};

// ------------------ HASHMAP ------------------
// Simple HashMap using Separate Chaining
// Hash function: sum of char codes % table size

class HashMap {
    static const int TABLE_SIZE = 8;
    // Each bucket stores chain of key-value pairs
    vector<pair<string, string>> table[TABLE_SIZE];

    int hashFunction(string key) {
        int sum = 0;
        for (int i = 0; i < key.length(); i++) {
            sum += key[i];
        }
        return sum % TABLE_SIZE;
    }

public:
    // Insert key-value pair
    void insert(string key, string value) {
        int index = hashFunction(key);
        // Check if key already exists, then update
        for (int i = 0; i < table[index].size(); i++) {
            if (table[index][i].first == key) {
                table[index][i].second = value;
                cout << "Updated key '" << key << "' at bucket " << index << endl;
                return;
            }
        }
        // Collision handling: add to chain
        table[index].push_back(make_pair(key, value));
        cout << "Inserted (" << key << ", " << value << ") at bucket " << index << endl;
    }

    // Search by key
    string search(string key) {
        int index = hashFunction(key);
        for (int i = 0; i < table[index].size(); i++) {
            if (table[index][i].first == key) {
                return table[index][i].second;
            }
        }
        return ""; // not found
    }

    // Delete by key
    bool remove(string key) {
        int index = hashFunction(key);
        for (int i = 0; i < table[index].size(); i++) {
            if (table[index][i].first == key) {
                table[index].erase(table[index].begin() + i);
                cout << "Deleted key '" << key << "' from bucket " << index << endl;
                return true;
            }
        }
        cout << "Key '" << key << "' not found" << endl;
        return false;
    }

    // Display all entries
    void display() {
        cout << "\nHashMap Contents:" << endl;
        for (int i = 0; i < TABLE_SIZE; i++) {
            cout << "Bucket " << i << ": ";
            if (table[i].empty()) {
                cout << "(empty)";
            } else {
                for (int j = 0; j < table[i].size(); j++) {
                    cout << "[" << table[i][j].first << ":" << table[i][j].second << "]";
                    if (j < table[i].size() - 1) cout << " -> ";
                }
            }
            cout << endl;
        }
    }

    int getBucket(string key) {
        return hashFunction(key);
    }
};

// ------------------ DEMO MAIN ------------------
int main() {
    cout << "=== AlgoVis Backend Demo (C++) ===" << endl;

    // Stack demo
    cout << "\n--- Stack Demo ---" << endl;
    Stack s(5);
    s.push(10);
    s.push(20);
    s.push(30);
    s.display();
    cout << "Top element: " << s.peek() << endl;
    cout << "Popped: " << s.pop() << endl;
    s.display();

    // Queue demo
    cout << "\n--- Queue Demo ---" << endl;
    Queue q(5);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display();
    cout << "Front element: " << q.getFront() << endl;
    cout << "Dequeued: " << q.dequeue() << endl;
    q.display();

    // Linked List demo
    cout << "\n--- Linked List Demo ---" << endl;
    LinkedList ll;
    ll.insertAtEnd(10);
    ll.insertAtEnd(20);
    ll.insertAtEnd(30);
    ll.display();
    ll.insertAtBeginning(5);
    ll.display();
    cout << "Search 20 at position: " << ll.search(20) << endl;
    ll.deleteFromBeginning();
    ll.display();

    // HashMap demo
    cout << "\n--- HashMap Demo ---" << endl;
    HashMap hm;
    hm.insert("Alice", "25");
    hm.insert("Bob", "30");
    hm.insert("Charlie", "22");
    hm.display();
    string val = hm.search("Bob");
    if (val != "") cout << "Found Bob: " << val << endl;
    hm.remove("Bob");
    hm.display();

    cout << "\nDemo completed!" << endl;
    return 0;
}
