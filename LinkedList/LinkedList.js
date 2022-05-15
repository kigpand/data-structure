import Comparator from '../Comparator';
import LinkedListNode from './LinkedListNode';

export default class LinkedList {

    /**
     *  head : 첫번째 노드
     *  tail : 마지막 노드 
     */
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @description 연결리스트 head쪽에 값 추가.
     * 
     * @param {*} value 연결리스트에 추가할 값 
     * @returns 
     */
    prepand(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if(!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * @description 연결리스트 tail쪽에 값 추가
     * 
     * @param {*} value 연결리스트에 추가할 값 
     * @returns 
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * @description 값을 추가할 index를 찾아서 해당 index에 값 추가.
     *              index가 0일 경우에는 head쪽에, 존재하지 않을 경우는 리스트가 존재하지 않는 경우이므로 새로운 리스트 추가.
     * 
     * @param {*} value 연결리스트에 추가할 값
     * @param {*} rawIndex 값을 추가할 인덱스
     * @returns 
     */
    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if(index === 0) {
            this.prepand(value);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new LinkedListNode(value);
            while(currentNode) {
                if (count === index) break;
                currentNode = currentNode.next;
                count += 1;
            }
            if (currentNode) {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                this.head = newNode;
                this.tail = newNode;
            }
        }

        return this;
    }

    /**
     * @description 
     * 
     * @param {*} value 삭제할 노드 값
     * @returns 삭제된 노드값
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;

        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode.next) {
                if(this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deleteNode;
    }

    /**
     * @description value에 해당하는 노드 찾는 함수. callback 함수를 받아와서 처리할 수도 있다.
     * 
     * @param {*} param
     * @returns 
     */
    find({ value = undefined, callback  = undefined}) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @description 마지막 노드 삭제 
     * @returns 
     */
    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * @description 첫번째 노드 삭제
     * @returns 
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @description 배열을 받아와서 연결리스트로 변환한다.
     * 
     * @param {*} values 연결리스트로 변환할 배열
     * @returns 
     */
    fromArray(values) {
        values.forEach((value) => this.append(value));

        return this;
    }

    /**
     * @description 현재의 연결리스트의 노드들을 배열로 변환한다.
     * @returns 
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @description 연결리스트를 배열로 변환한 후 string형으로 변환.
     * 
     * @param {*} callback 문자열로 변환하면서 실행할 callback 함수
     * @returns 
     */
    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    /**
     * @description 노드의 순서를 거꾸로 변환.
     * @returns 
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;

            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}