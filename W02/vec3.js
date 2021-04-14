class Vec3
{
    //constructor
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this
    }

    min()
    {
        return Math.min(this.x, this.y, this.z)
    }

    max()
    {
        return Math.max(this.x, this.y, this.z)
    }

    mid()
    {
        if(this.x > this.y || this.x < this.z )return this.x
        else if(this.x < this.y || this.x > this.z)return this.x
        else if(this.y < this.x || this.y > this.z)return this.y
        else if(this.y > this.x || this.y < this.z)return this.y
        else if(this.z > this.x || this.z < this.y)return this.z
        else if(this.z < this.x || this.z > this.y)return this.z
    }

    triangle(v2 ,v3)
    {
        var v12 = new Vec3(v2.x-this.x, v2.y-this.y, v2.z-this.z);
        var v13 = new Vec3(v3.x-this.x, v3.y-this.y, v3.z-this.z);
        var g1 = v12.y*v13.z-v12.z*v13.y;
        var g2 = v12.z*v13.x-v12.x*v13.z;
        var g3 = v12.x*v13.y-v12.y*v13.x;

        return Math.sqrt(g1*g1+g2*g2+g3*g3)/2
    }

}