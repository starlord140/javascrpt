#define rep(i,a,b) for(i=a;i<b;i++)
#define rep1(i,a,b) for(i=a;i>b;i--)

#include<bits/stdc++.h>

using namespace std;
 main()
{string s,s1;
    int i,j,k;
    cin>>s;
    int len=s.length();
    rep(i,0,len){
 if(s[i]=='a'||s[i]=='e'||s[i]=='i'||s[i]=='o'||s[i]=='u'||s[i]=='A'||s[i]=='E'||s[i]=='I'||s[i]=='O'||s[i]=='U')    {
        continue;
    }
    else{
            s1+='.';
            s1+=towlower(s[i]);
    }
}cout<<s1;

}
