import java.math.BigInteger;

public class Homework2 {
	public static void main(String args[]) 
	{
		int leftshift = 1;
		BigInteger temp = new BigInteger("1");
		BigInteger difficulty = temp.shiftLeft(leftshift);
		System.out.println(difficulty);
	}
}