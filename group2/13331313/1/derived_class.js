/*
������Ҷ�㿭
ѧ�ţ�13331313
��ע���ҵ������ο���ͬ����������û�����ü̳еĻ��ơ�����֮����¡�
*/

function Base(insV) {
    Base.staticVariable = 'Base';
    Base.staticMethod = function() {
        console.log("This is from Base class static-method, static-variable is: " + Base.staticVariable);
    }
    this.instanceVariable = insV;
    this.instanceMethod = function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

function Derived(insV) {
    this.instanceVariable = insV;
    extend(Base, this);         //��1����ΪBase������Ҫ���ղ������ó�extend����Derived��constructor����
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function() {
        Base.staticMethod();    //��2�����ﲻ��д�ɡ�Derived.prototype��,��Ϊextend�ǽ�Base����ΪDerived����ĸ��࣬���Derived.prototype != Base
        console.log("This is from Derived class static-method, static-variable is: " + Derived.staticVariable);
    }
    this.instanceMethod = function() {
        this.prototype.instanceMethod();    //(3)���ڱ�ע��2���������ǿ�ʵ�ֵ�
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

function extend(base, derived) {
    derived.prototype = new base(derived.instanceVariable);
}

/*��һ���������,������*/
/***********************************************************/
/*
input:
    example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();
standard-output:
    This is from Base class static-method, static-variable is: Derived
    This is from Derived class static-method, static-variable is: Derived
    This is from Base class instance-method, instance-variable is: example
    This is from Derived class instance-method, instance-variable is: example
    
standard-output:
    This is from Base class static-method, static-variable is: Base   //���ڱ�ע��2����Base���staticVariable��������Derived�����staticVariable�ı���ı�
    This is from Derived class static-method, static-variable is: Derived
    This is from Base class instance-method, instance-variable is: example
    This is from Derived class instance-method, instance-variable is: example
*/
